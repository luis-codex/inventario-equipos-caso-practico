import { Injectable, computed, inject, signal } from '@angular/core';
import { Equipo, EstadoEquipo } from '../models/equipo.model';
import { EquipoService } from './equipo.service';

const CACHE_KEY = 'inventario_equipos_cache';

interface CachePayload {
  equipos: Equipo[];
  guardadoEn: string;
}

// Store central del listado de equipos: mantiene el estado reactivo (signals),
// consume la API via EquipoService y cae a la ultima copia en localStorage
// cuando la peticion falla por falta de conexion (Actividad de persistencia offline).
@Injectable({ providedIn: 'root' })
export class EquiposStoreService {
  private readonly equipoService = inject(EquipoService);

  private readonly _equipos = signal<Equipo[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _usandoCache = signal(false);
  private readonly _ultimaActualizacion = signal<string | null>(null);

  readonly equipos = this._equipos.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly usandoCache = this._usandoCache.asReadonly();
  readonly ultimaActualizacion = this._ultimaActualizacion.asReadonly();
  readonly total = computed(() => this._equipos().length);

  cargar(): void {
    this._loading.set(true);
    this._error.set(null);

    this.equipoService.getAll().subscribe({
      next: (equipos) => {
        this._equipos.set(equipos);
        this._usandoCache.set(false);
        this._loading.set(false);
        this.guardarEnCache(equipos);
      },
      error: () => {
        this._loading.set(false);
        const cache = this.leerCache();
        if (cache) {
          this._equipos.set(cache.equipos);
          this._usandoCache.set(true);
          this._ultimaActualizacion.set(cache.guardadoEn);
          this._error.set('Sin conexion con el servidor: mostrando la ultima informacion consultada.');
        } else {
          this._error.set('Sin conexion con el servidor y no hay datos guardados localmente todavia.');
        }
      },
    });
  }

  registrar(equipo: Equipo, onDone: (ok: boolean, mensaje?: string) => void): void {
    this.equipoService.create(equipo).subscribe({
      next: () => {
        onDone(true);
        this.cargar();
      },
      error: (err) => onDone(false, err?.error?.error ?? 'No se pudo registrar el equipo'),
    });
  }

  actualizarEstado(codigo: string, estado: EstadoEquipo, onDone: (ok: boolean, mensaje?: string) => void): void {
    this.equipoService.updateEstado(codigo, estado).subscribe({
      next: () => {
        onDone(true);
        this.cargar();
      },
      error: (err) => onDone(false, err?.error?.error ?? 'No se pudo actualizar el estado'),
    });
  }

  private guardarEnCache(equipos: Equipo[]): void {
    const payload: CachePayload = { equipos, guardadoEn: new Date().toISOString() };
    this._ultimaActualizacion.set(payload.guardadoEn);
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  }

  private leerCache(): CachePayload | null {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as CachePayload;
    } catch {
      return null;
    }
  }
}

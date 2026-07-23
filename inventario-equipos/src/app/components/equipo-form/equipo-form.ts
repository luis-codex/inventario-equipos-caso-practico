import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EquiposStoreService } from '../../services/equipos-store.service';
import { ESTADOS_EQUIPO, Equipo } from '../../models/equipo.model';

function equipoVacio(): Equipo {
  return { codigo: '', nombre: '', categoria: '', laboratorio: '', estado: 'Disponible', responsable: '' };
}

@Component({
  selector: 'app-equipo-form',
  imports: [FormsModule],
  templateUrl: './equipo-form.html',
  styleUrl: './equipo-form.css',
})
export class EquipoForm {
  private readonly store = inject(EquiposStoreService);

  protected readonly estados = ESTADOS_EQUIPO;
  protected modelo = equipoVacio();
  protected readonly guardando = signal(false);
  protected readonly mensaje = signal<{ tipo: 'ok' | 'error'; texto: string } | null>(null);

  registrar(): void {
    this.guardando.set(true);
    this.mensaje.set(null);
    this.store.registrar(this.modelo, (ok, texto) => {
      this.guardando.set(false);
      if (ok) {
        this.mensaje.set({ tipo: 'ok', texto: `Equipo ${this.modelo.codigo} registrado correctamente.` });
        this.modelo = equipoVacio();
      } else {
        this.mensaje.set({ tipo: 'error', texto: texto ?? 'No se pudo registrar el equipo.' });
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { EquiposStoreService } from '../../services/equipos-store.service';
import { ESTADOS_EQUIPO, Equipo, EstadoEquipo, claseEstado } from '../../models/equipo.model';

@Component({
  selector: 'app-equipo-list',
  imports: [],
  templateUrl: './equipo-list.html',
  styleUrl: './equipo-list.css',
})
export class EquipoList {
  protected readonly store = inject(EquiposStoreService);
  protected readonly estados = ESTADOS_EQUIPO;
  protected mensaje = '';

  claseEstado = claseEstado;

  cambiarEstado(equipo: Equipo, nuevoEstado: string): void {
    const estado = nuevoEstado as EstadoEquipo;
    if (estado === equipo.estado) return;
    this.store.actualizarEstado(equipo.codigo, estado, (ok, mensaje) => {
      this.mensaje = ok
        ? `Estado de ${equipo.codigo} actualizado a "${estado}".`
        : (mensaje ?? 'Error al actualizar el estado.');
    });
  }
}

export type EstadoEquipo = 'Disponible' | 'En uso' | 'Mantenimiento' | 'Baja';

export const ESTADOS_EQUIPO: EstadoEquipo[] = ['Disponible', 'En uso', 'Mantenimiento', 'Baja'];

export interface Equipo {
  codigo: string;
  nombre: string;
  categoria: string;
  laboratorio: string;
  estado: EstadoEquipo;
  responsable: string;
}

export function claseEstado(estado: EstadoEquipo): string {
  return 'estado-badge estado-' + estado.toLowerCase().replace(/\s+/g, '-');
}

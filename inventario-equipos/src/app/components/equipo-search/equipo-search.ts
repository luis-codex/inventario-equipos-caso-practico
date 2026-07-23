import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EquipoService } from '../../services/equipo.service';
import { Equipo, claseEstado } from '../../models/equipo.model';

@Component({
  selector: 'app-equipo-search',
  imports: [FormsModule],
  templateUrl: './equipo-search.html',
  styleUrl: './equipo-search.css',
})
export class EquipoSearch {
  private readonly equipoService = inject(EquipoService);

  protected codigo = '';
  protected readonly resultado = signal<Equipo | null>(null);
  protected readonly buscando = signal(false);
  protected readonly noEncontrado = signal(false);
  claseEstado = claseEstado;

  buscar(): void {
    const codigo = this.codigo.trim();
    if (!codigo) return;
    this.buscando.set(true);
    this.noEncontrado.set(false);
    this.resultado.set(null);
    this.equipoService.getByCodigo(codigo).subscribe({
      next: (equipo) => {
        this.resultado.set(equipo);
        this.buscando.set(false);
      },
      error: () => {
        this.noEncontrado.set(true);
        this.buscando.set(false);
      },
    });
  }
}

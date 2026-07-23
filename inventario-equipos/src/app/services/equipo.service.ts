import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Equipo, EstadoEquipo } from '../models/equipo.model';

@Injectable({ providedIn: 'root' })
export class EquipoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/equipos`;

  getAll(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.baseUrl);
  }

  getByCodigo(codigo: string): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.baseUrl}/${codigo}`);
  }

  create(equipo: Equipo): Observable<Equipo> {
    return this.http.post<Equipo>(this.baseUrl, equipo);
  }

  updateEstado(codigo: string, estado: EstadoEquipo): Observable<{ codigo: string; estado: EstadoEquipo }> {
    return this.http.put<{ codigo: string; estado: EstadoEquipo }>(`${this.baseUrl}/${codigo}/estado`, { estado });
  }
}

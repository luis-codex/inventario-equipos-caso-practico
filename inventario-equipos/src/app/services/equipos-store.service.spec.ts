import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { EquiposStoreService } from './equipos-store.service';
import { environment } from '../../environments/environment';
import { Equipo } from '../models/equipo.model';

const EQUIPOS: Equipo[] = [
  {
    codigo: 'EQ-001',
    nombre: 'PC Dell',
    categoria: 'Computador',
    laboratorio: 'Laboratorio de Redes',
    estado: 'Disponible',
    responsable: 'Luis Tenorio',
  },
];

describe('EquiposStoreService', () => {
  let store: EquiposStoreService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    store = TestBed.inject(EquiposStoreService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('carga el listado desde la API y lo guarda en cache', () => {
    store.cargar();
    const req = httpMock.expectOne(`${environment.apiUrl}/equipos`);
    req.flush(EQUIPOS);

    expect(store.equipos()).toEqual(EQUIPOS);
    expect(store.usandoCache()).toBe(false);
    expect(localStorage.getItem('inventario_equipos_cache')).toBeTruthy();
  });

  it('si la peticion falla, recupera el ultimo listado guardado en localStorage', () => {
    localStorage.setItem(
      'inventario_equipos_cache',
      JSON.stringify({ equipos: EQUIPOS, guardadoEn: '2026-07-01T00:00:00.000Z' })
    );

    store.cargar();
    const req = httpMock.expectOne(`${environment.apiUrl}/equipos`);
    req.error(new ProgressEvent('network error'));

    expect(store.equipos()).toEqual(EQUIPOS);
    expect(store.usandoCache()).toBe(true);
  });
});

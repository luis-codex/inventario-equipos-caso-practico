import { Component, OnInit, inject } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { OfflineBanner } from './components/offline-banner/offline-banner';
import { EquipoList } from './components/equipo-list/equipo-list';
import { EquipoSearch } from './components/equipo-search/equipo-search';
import { EquipoForm } from './components/equipo-form/equipo-form';
import { EquiposStoreService } from './services/equipos-store.service';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, OfflineBanner, EquipoList, EquipoSearch, EquipoForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly store = inject(EquiposStoreService);

  ngOnInit(): void {
    this.store.cargar();
  }
}

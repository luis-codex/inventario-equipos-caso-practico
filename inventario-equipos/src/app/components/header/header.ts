import { Component, inject } from '@angular/core';
import { EquiposStoreService } from '../../services/equipos-store.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly store = inject(EquiposStoreService);
}

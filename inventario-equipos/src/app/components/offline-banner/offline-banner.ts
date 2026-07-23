import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ConnectivityService } from '../../services/connectivity.service';
import { EquiposStoreService } from '../../services/equipos-store.service';

@Component({
  selector: 'app-offline-banner',
  imports: [DatePipe],
  templateUrl: './offline-banner.html',
  styleUrl: './offline-banner.css',
})
export class OfflineBanner {
  protected readonly connectivity = inject(ConnectivityService);
  protected readonly store = inject(EquiposStoreService);
}

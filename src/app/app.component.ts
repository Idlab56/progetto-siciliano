import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonMenuToggle,
  IonLabel,
} from '@ionic/angular/standalone';
import { DataService } from './services/data.service';

// Root component dell'applicazione Ionic.
// Gestisce lo stato globale dell'app, come il menu principale, il conteggio dei preferiti e l'autenticazione.
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    CommonModule,
    RouterModule,
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonMenuToggle,
    IonLabel,
  ],
})
export class AppComponent {
  // Numero di eventi salvati nei preferiti, mostrato nella UI del menu.
  preferitiCount = 0;
  // Stato di login dell'utente, gestito tramite DataService.
  isLoggedIn = false;

  constructor(private dataService: DataService) {
    // Sottoscrive lo stato di autenticazione per aggiornare la UI in tempo reale.
    this.dataService.isLoggedIn$.subscribe((logged) => {
      this.isLoggedIn = logged;
    });
    // Sottoscrive la lista dei preferiti per mantenere il conteggio sempre aggiornato.
    this.dataService.preferiti$.subscribe((list) => {
      this.preferitiCount = list.length;
    });
  }

  // Effettua il logout dell'utente e aggiorna lo stato globale.
  logout(): void {
    this.dataService.logout();
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonButtons, IonMenuButton, IonBackButton } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Evento } from '../models/event.model';
import { Utente } from '../models/user.model';

// Pagina profilo: mostra gli eventi salvati nei preferiti per l'utente corrente.
@Component({
  standalone: true,
  selector: 'app-profilo',
  templateUrl: 'profilo.page.html',
  styleUrls: ['profilo.page.scss'],
  imports: [CommonModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonButtons, IonMenuButton, IonBackButton],
})
export class ProfiloPage {
  preferiti: Evento[] = [];
  user: Utente | null = null;

  constructor(private dataService: DataService, private router: Router) {}

  ionViewWillEnter(): void {
    if (!this.dataService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.user = this.dataService.getCurrentUser();
    this.preferiti = this.dataService.getPreferiti();
  }

  logout(): void {
    this.dataService.logout();
    this.router.navigate(['/home']);
  }

  rimuoviPreferito(id: number): void {
    this.dataService.rimuoviPreferito(id);
    this.preferiti = this.dataService.getPreferiti();
  }
}

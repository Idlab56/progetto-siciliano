import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonButtons, IonMenuButton, IonBackButton } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Evento } from '../models/event.model';

// Pagina profilo: mostra gli eventi salvati nei preferiti e consente il logout.
@Component({
  standalone: true,
  selector: 'app-profilo',
  templateUrl: 'profilo.page.html',
  styleUrls: ['profilo.page.scss'],
  imports: [CommonModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonButtons, IonMenuButton, IonBackButton],
})
export class ProfiloPage {
  // Lista di eventi salvati dall'utente.
  preferiti: Evento[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  // Controlla che l'utente sia ancora loggato ogni volta che la pagina viene visualizzata.
  // Se non è loggato, lo reindirizza al login.
  ionViewWillEnter(): void {
    this.dataService.isLoggedIn$.subscribe((logged) => {
      if (!logged) {
        this.router.navigate(['/login']);
      } else {
        this.preferiti = this.dataService.getPreferiti();
      }
    });
  }

  // Effettua il logout e torna alla home page.
  logout(): void {
    this.dataService.logout();
    this.router.navigate(['/home']);
  }

  // Rimuove un evento dai preferiti e aggiorna la lista mostrata.
  rimuoviPreferito(id: number): void {
    this.dataService.rimuoviPreferito(id);
    this.preferiti = this.dataService.getPreferiti();
  }
}

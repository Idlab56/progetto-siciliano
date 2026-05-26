import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonButtons, IonMenuButton, IonBackButton } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Evento } from '../models/event.model';

@Component({
  standalone: true,
  selector: 'app-profilo',
  templateUrl: 'profilo.page.html',
  styleUrls: ['profilo.page.scss'],
  imports: [CommonModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonButtons, IonMenuButton, IonBackButton],
})
export class ProfiloPage {
  preferiti: Evento[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ionViewWillEnter(): void {
    this.dataService.isLoggedIn$.subscribe((logged) => {
      if (!logged) {
        this.router.navigate(['/login']);
      } else {
        this.preferiti = this.dataService.getPreferiti();
      }
    });
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

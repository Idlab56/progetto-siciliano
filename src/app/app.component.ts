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
  preferitiCount = 0;
  isLoggedIn = false;

  constructor(private dataService: DataService) {
    this.dataService.isLoggedIn$.subscribe((logged) => {
      this.isLoggedIn = logged;
    });
    this.dataService.preferiti$.subscribe((list) => {
      this.preferitiCount = list.length;
    });
  }

  logout(): void {
    this.dataService.logout();
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonButtons, IonMenuButton, IonBackButton, ToastController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

// Pagina di login semplificata: accetta email e password e imposta lo stato di accesso.
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  imports: [CommonModule, FormsModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonButtons, IonMenuButton, IonBackButton],
})
export class LoginPage {
  // Campi di input della pagina di login.
  email = '';
  password = '';

  constructor(private dataService: DataService, private router: Router, private toastCtrl: ToastController) {}

  // Effettua il login: controlla i campi, aggiorna lo stato e indirizza alla pagina profilo.
  async login() {
    if (!this.email || !this.password) {
      const t = await this.toastCtrl.create({ message: 'Inserisci email e password', duration: 1500, color: 'warning' });
      await t.present();
      return;
    }
    this.dataService.login();
    await this.router.navigate(['/profilo']);
  }
}

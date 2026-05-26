import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonButtons, IonMenuButton, IonBackButton, ToastController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  imports: [CommonModule, FormsModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonButtons, IonMenuButton, IonBackButton],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private dataService: DataService, private router: Router, private toastCtrl: ToastController) {}

  async login() {
    // semplice validazione
    if (!this.email || !this.password) {
      const t = await this.toastCtrl.create({ message: 'Inserisci email e password', duration: 1500, color: 'warning' });
      await t.present();
      return;
    }
    this.dataService.login();
    await this.router.navigate(['/profilo']);
  }
}

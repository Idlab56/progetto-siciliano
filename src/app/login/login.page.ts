import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonButtons, IonMenuButton, IonBackButton, ToastController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

// Pagina di login e registrazione: salva gli utenti in JSON locale e gestisce l'accesso.
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
  nome = '';
  confermaPassword = '';
  isRegister = false;

  constructor(private dataService: DataService, private router: Router, private toastCtrl: ToastController) {}

  async submit() {
    if (this.isRegister) {
      await this.register();
    } else {
      await this.login();
    }
  }

  async login() {
    if (!this.email || !this.password) {
      await this.presentToast('Inserisci email e password', 'warning');
      return;
    }
    const result = this.dataService.loginUser(this.email, this.password);
    if (!result.success) {
      await this.presentToast(result.message, 'danger');
      return;
    }
    await this.router.navigate(['/home']);
  }

  async register() {
    if (!this.email || !this.password || !this.nome || !this.confermaPassword) {
      await this.presentToast('Compila tutti i campi', 'warning');
      return;
    }
    if (this.password !== this.confermaPassword) {
      await this.presentToast('Le password non corrispondono', 'warning');
      return;
    }
    const result = this.dataService.registerUser(this.email, this.password, this.nome);
    if (!result.success) {
      await this.presentToast(result.message, 'danger');
      return;
    }
    await this.presentToast('Registrazione completata', 'success');
    await this.router.navigate(['/home']);
  }

  toggleMode() {
    this.isRegister = !this.isRegister;
  }

  private async presentToast(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastCtrl.create({ message, duration: 1800, color });
    await toast.present();
  }
}

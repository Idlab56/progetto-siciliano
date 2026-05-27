import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonMenuButton,
  IonBackButton,
  ToastController,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Evento } from '../models/event.model';
import { take } from 'rxjs/operators';

// Pagina dettaglio evento: mostra i dettagli dell'evento selezionato e permette di salvare nei preferiti.
@Component({
  standalone: true,
  selector: 'app-dettaglio',
  templateUrl: 'dettaglio.page.html',
  styleUrls: ['dettaglio.page.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonButtons,
    IonMenuButton,
    IonBackButton,
  ],
})
export class DettaglioPage implements OnInit {
  // Evento selezionato a cui mostrare i dettagli.
  evento: Evento | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  // Legge l'id dalla rotta e carica i dettagli dell'evento corrispondente.
  ngOnInit(): void {
    this.route.paramMap.subscribe((pm) => {
      const id = Number(pm.get('id'));
      if (id) {
        this.dataService.getEvento(id).subscribe((e) => (this.evento = e));
      }
    });
  }

  // Salva l'evento nei preferiti se l'utente è autenticato, altrimenti reindirizza al login.
  async salva(): Promise<void> {
    this.dataService.isLoggedIn$.pipe(take(1)).subscribe(async (logged) => {
      if (!logged) {
        await this.router.navigate(['/login']);
        return;
      }
      if (this.evento) {
        this.dataService.aggiungiPreferito(this.evento);
        const t = await this.toastCtrl.create({ message: 'Salvato nei preferiti', duration: 2000, color: 'primary' });
        await t.present();
      }
    });
  }
}

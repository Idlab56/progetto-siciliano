import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonChip,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonBackButton,
} from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { Evento } from '../models/event.model';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonChip,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonBackButton,
  ],
})
export class HomePage implements OnInit {
  eventi: Evento[] = [];
  eventiFiltrati: Evento[] = [];
  categorie: string[] = [];
  searchTerm = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getEventi().subscribe((list) => {
      this.eventi = list;
      this.eventiFiltrati = [...list];
      this.categorie = Array.from(new Set(list.map((e) => e.categoria)));
    });
  }

  filtra(categoria: string): void {
    if (!categoria) {
      this.eventiFiltrati = [...this.eventi];
      return;
    }
    this.eventiFiltrati = this.eventi.filter((e) => e.categoria === categoria);
  }

  cerca(termine: string): void {
    this.searchTerm = termine || '';
    const t = this.searchTerm.toLowerCase();
    this.eventiFiltrati = this.eventi.filter(
      (e) =>
        e.titolo.toLowerCase().includes(t) ||
        e.descrizione.toLowerCase().includes(t) ||
        e.luogo.toLowerCase().includes(t)
    );
  }
}

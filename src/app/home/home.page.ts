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

// Pagina principale che mostra l'elenco eventi, i filtri per categoria e la ricerca.
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
  // Elenco completo di eventi caricati dal servizio.
  eventi: Evento[] = [];
  // Elenco di eventi filtrati in base a categoria o ricerca.
  eventiFiltrati: Evento[] = [];
  // Categorie uniche estratte dalla lista eventi per il filtro.
  categorie: string[] = [];
  // Termine di ricerca inserito dall'utente.
  searchTerm = '';

  constructor(private dataService: DataService) {}

  // Carica gli eventi all'avvio della pagina e inizializza i filtri.
  ngOnInit(): void {
    this.dataService.getEventi().subscribe((list) => {
      this.eventi = list;
      this.eventiFiltrati = [...list];
      this.categorie = Array.from(new Set(list.map((e) => e.categoria)));
    });
  }

  // Applica filtro per categoria. Se la categoria è vuota, mostra tutti gli eventi.
  filtra(categoria: string): void {
    if (!categoria) {
      this.eventiFiltrati = [...this.eventi];
      return;
    }
    this.eventiFiltrati = this.eventi.filter((e) => e.categoria === categoria);
  }

  // Cerca il termine nella proprietà titolo, descrizione o luogo.
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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.page.html',
  styleUrls: ['./dettaglio.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DettaglioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

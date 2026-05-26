import { Component, OnInit } from '@angular/core';
import { Data } from '../service/data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  eventi: any[] = [];
  eventiFiltrati: any[] = [];
  categorie = ['Tutti', 'Concerti', 'Teatro', 'Incontri'];
  catAttiva = 'Tutti';

  constructor(private dataService: Data) {}

  ngOnInit() {
    this.dataService.getEventi().subscribe(res => {
      this.eventi = res;
      this.eventiFiltrati = res;
    });
  }

  filtra(cat: string) {
    this.catAttiva = cat;
    this.eventiFiltrati = cat === 'Tutti' ? this.eventi : this.eventi.filter(e => e.categoria === cat);
  }

  cerca(event: any) {
    const val = event.target.value.toLowerCase();
    this.eventiFiltrati = this.eventi.filter(e => e.titolo.toLowerCase().includes(val));
  }
}

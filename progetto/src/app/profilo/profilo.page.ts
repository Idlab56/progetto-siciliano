import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../service/data';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage {
  preferiti: any[] = [];

  constructor(private dataService: Data, private router: Router) {}

  ionViewWillEnter() {
    this.dataService.isLoggedIn().subscribe(logged => {
      if (!logged) this.router.navigate(['/login']);
      else this.preferiti = this.dataService.getPreferiti();
    });
  }

  rimuovi(id: number) {
    this.dataService.rimuoviPreferito(id);
    this.preferiti = this.dataService.getPreferiti();
  }

  logout() {
    this.dataService.logout();
    this.router.navigate(['/home']);
  }
}

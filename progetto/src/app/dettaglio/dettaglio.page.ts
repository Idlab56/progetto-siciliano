import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from '../service/data';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.page.html',
  styleUrls: ['./dettaglio.page.scss'],
})
export class DettaglioPage implements OnInit {
  evento?: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: Data,
    private router: Router,
    private toast: ToastController
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.dataService.getEventi().subscribe(list => this.evento = list.find(e => e.id === id));
  }

  async salva() {
    this.dataService.isLoggedIn().subscribe(async logged => {
      if (!logged) {
        this.router.navigate(['/login']);
      } else {
        this.dataService.aggiungiPreferito(this.evento!);
        const t = await this.toast.create({ message: 'Aggiunto ai preferiti!', duration: 2000, color: 'success' });
        t.present();
      }
    });
  }
}

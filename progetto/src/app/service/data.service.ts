import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Evento } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private loggedIn = new BehaviorSubject<boolean>(localStorage.getItem('isLoggedIn') === 'true');

  constructor(private http: HttpClient) {}

  getEventi(): Observable<Evento[]> {
    return this.http.get<Evento[]>('assets/events.json');
  }

  // Gestione Preferiti
  getPreferiti(): Evento[] {
    return JSON.parse(localStorage.getItem('preferiti') || '[]');
  }

  aggiungiPreferito(evento: Evento) {
    let pref = this.getPreferiti();
    if (!pref.find(e => e.id === evento.id)) {
      pref.push(evento);
      localStorage.setItem('preferiti', JSON.stringify(pref));
    }
  }

  rimuoviPreferito(id: number) {
    let pref = this.getPreferiti().filter(e => e.id !== id);
    localStorage.setItem('preferiti', JSON.stringify(pref));
  }

  // Gestione Auth
  isLoggedIn() { return this.loggedIn.asObservable(); }
  login() { localStorage.setItem('isLoggedIn', 'true'); this.loggedIn.next(true); }
  logout() { 
    localStorage.removeItem('isLoggedIn'); 
    localStorage.removeItem('preferiti');
    this.loggedIn.next(false); 
  }
}

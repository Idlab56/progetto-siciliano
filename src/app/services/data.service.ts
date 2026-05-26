import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Evento } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private preferitiKey = 'preferiti';
  private loginKey = 'isLoggedIn';
  private _isLoggedIn = new BehaviorSubject<boolean>(localStorage.getItem(this.loginKey) === 'true');
  public isLoggedIn$ = this._isLoggedIn.asObservable();

  private _preferiti = new BehaviorSubject<Evento[]>(this.readPreferiti());
  public preferiti$ = this._preferiti.asObservable();

  constructor(private http: HttpClient) {}

  getEventi(): Observable<Evento[]> {
    return this.http.get<Evento[]>('assets/events.json');
  }

  getEvento(id: number): Observable<Evento | undefined> {
    return this.getEventi().pipe(map((list) => list.find((e) => e.id === id)));
  }

  private readPreferiti(): Evento[] {
    try {
      return JSON.parse(localStorage.getItem(this.preferitiKey) || '[]');
    } catch {
      return [];
    }
  }

  // Preferiti in localStorage
  getPreferiti(): Evento[] {
    return this._preferiti.value;
  }

  aggiungiPreferito(evento: Evento): void {
    const list = this.readPreferiti();
    if (!list.find((e) => e.id === evento.id)) {
      list.push(evento);
      localStorage.setItem(this.preferitiKey, JSON.stringify(list));
      this._preferiti.next(list);
    }
  }

  rimuoviPreferito(id: number): void {
    const list = this.readPreferiti().filter((e) => e.id !== id);
    localStorage.setItem(this.preferitiKey, JSON.stringify(list));
    this._preferiti.next(list);
  }

  // Login state
  login(): void {
    localStorage.setItem(this.loginKey, 'true');
    this._isLoggedIn.next(true);
  }

  logout(): void {
    localStorage.removeItem(this.loginKey);
    this._isLoggedIn.next(false);
  }
}

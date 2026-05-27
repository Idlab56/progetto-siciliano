import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Evento } from '../models/event.model';
import { Utente } from '../models/user.model';

// Servizio centrale che gestisce eventi, utenti, preferiti per utente e lo stato di autenticazione.
@Injectable({ providedIn: 'root' })
export class DataService {
  private usersKey = 'users';
  private currentUserKey = 'currentUser';
  private loginKey = 'isLoggedIn';
  private preferitiKey = 'preferiti';

  private _isLoggedIn = new BehaviorSubject<boolean>(localStorage.getItem(this.loginKey) === 'true');
  public isLoggedIn$ = this._isLoggedIn.asObservable();

  private _currentUser = new BehaviorSubject<Utente | null>(this.readCurrentUser());
  public currentUser$ = this._currentUser.asObservable();

  private _preferiti = new BehaviorSubject<Evento[]>(this.readPreferitiForCurrentUser());
  public preferiti$ = this._preferiti.asObservable();

  private _users = new BehaviorSubject<Utente[]>(this.readUsers());
  public users$ = this._users.asObservable();

  constructor(private http: HttpClient) {
    if (!localStorage.getItem(this.usersKey)) {
      this.http.get<Utente[]>('assets/users.json').subscribe((users) => {
        const list = users || [];
        localStorage.setItem(this.usersKey, JSON.stringify(list));
        this._users.next(list);
      });
    }
  }

  getEventi(): Observable<Evento[]> {
    // Carica la lista eventi dal file JSON locale.
    return this.http.get<Evento[]>('assets/events.json');
  }

  getEvento(id: number): Observable<Evento | undefined> {
    // Restituisce l'evento con l'id specificato, filtrando la lista completa.
    return this.getEventi().pipe(map((list) => list.find((e) => e.id === id)));
  }

  private readUsers(): Utente[] {
    try {
      return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    } catch {
      return [];
    }
  }

  private saveUsers(users: Utente[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    this._users.next(users);
  }

  private readCurrentUser(): Utente | null {
    try {
      return JSON.parse(localStorage.getItem(this.currentUserKey) || 'null');
    } catch {
      return null;
    }
  }

  private saveCurrentUser(user: Utente | null): void {
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      this._currentUser.next(user);
    } else {
      localStorage.removeItem(this.currentUserKey);
      this._currentUser.next(null);
    }
  }

  private getPreferitiKey(email: string): string {
    return `${this.preferitiKey}_${email.toLowerCase()}`;
  }

  private readPreferitiForUser(email: string): Evento[] {
    try {
      return JSON.parse(localStorage.getItem(this.getPreferitiKey(email)) || '[]');
    } catch {
      return [];
    }
  }

  private readPreferitiForCurrentUser(): Evento[] {
    const user = this.readCurrentUser();
    return user ? this.readPreferitiForUser(user.email) : [];
  }

  private savePreferitiForCurrentUser(list: Evento[]): void {
    const user = this.getCurrentUser();
    if (!user) {
      return;
    }
    localStorage.setItem(this.getPreferitiKey(user.email), JSON.stringify(list));
    this._preferiti.next(list);
  }

  getPreferiti(): Evento[] {
    return this._preferiti.value;
  }

  aggiungiPreferito(evento: Evento): void {
    const user = this.getCurrentUser();
    if (!user) {
      return;
    }
    const list = this.readPreferitiForUser(user.email);
    if (!list.find((e) => e.id === evento.id)) {
      list.push(evento);
      this.savePreferitiForCurrentUser(list);
    }
  }

  rimuoviPreferito(id: number): void {
    const user = this.getCurrentUser();
    if (!user) {
      return;
    }
    const list = this.readPreferitiForUser(user.email).filter((e) => e.id !== id);
    this.savePreferitiForCurrentUser(list);
  }

  getCurrentUser(): Utente | null {
    return this._currentUser.value;
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn.value;
  }

  loginUser(email: string, password: string): { success: boolean; message: string } {
    const users = this.readUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      return { success: false, message: 'Email o password errati' };
    }
    localStorage.setItem(this.loginKey, 'true');
    this._isLoggedIn.next(true);
    this.saveCurrentUser(user);
    this._preferiti.next(this.readPreferitiForUser(user.email));
    return { success: true, message: 'Login effettuato' };
  }

  registerUser(email: string, password: string, nome: string): { success: boolean; message: string } {
    const users = this.readUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'Email già registrata' };
    }
    const newUser: Utente = { email, password, nome };
    users.push(newUser);
    this.saveUsers(users);
    localStorage.setItem(this.loginKey, 'true');
    this._isLoggedIn.next(true);
    this.saveCurrentUser(newUser);
    this._preferiti.next([]);
    return { success: true, message: 'Registrazione completata' };
  }

  logout(): void {
    localStorage.removeItem(this.loginKey);
    this._isLoggedIn.next(false);
    this.saveCurrentUser(null);
    this._preferiti.next([]);
  }
}

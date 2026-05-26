import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Data {
  private data: any[] = [];
  private isLogged = new BehaviorSubject<boolean>(false);
  private preferiti: any[] = [];

  constructor() {}

  getData() {
    return this.data;
  }

  setData(newData: any[]) {
    this.data = newData;
  }

  addData(item: any) {
    this.data.push(item);
  }

  removeData(index: number) {
    this.data.splice(index, 1);
  }

  getEventi(): Observable<any[]> {
    return of(this.data);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

  setLoggedIn(logged: boolean) {
    this.isLogged.next(logged);
  }

  aggiungiPreferito(evento: any) {
    this.preferiti.push(evento);
  }

  getPreferiti() {
    return this.preferiti;
  }

  login() {
    this.setLoggedIn(true);
  }
}

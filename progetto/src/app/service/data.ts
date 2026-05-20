import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Data {
  private data: any[] = [];

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
}

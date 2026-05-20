import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Data } from './service/data';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, ReactiveFormsModule, FormsModule],
})
export class AppComponent {
  constructor(private dataService: Data) {}
}

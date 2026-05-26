import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DettaglioPage } from './dettaglio.page';

describe('DettaglioPage', () => {
  let component: DettaglioPage;
  let fixture: ComponentFixture<DettaglioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

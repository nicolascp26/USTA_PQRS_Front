import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeAdministrarComponent } from './mensaje-administrar.component';

describe('MensajeAdministrarComponent', () => {
  let component: MensajeAdministrarComponent;
  let fixture: ComponentFixture<MensajeAdministrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeAdministrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeAdministrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeCrearComponent } from './mensaje-crear.component';

describe('MensajeCrearComponent', () => {
  let component: MensajeCrearComponent;
  let fixture: ComponentFixture<MensajeCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeCrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

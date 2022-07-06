import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeVisualizarComponent } from './mensaje-visualizar.component';

describe('MensajeVisualizarComponent', () => {
  let component: MensajeVisualizarComponent;
  let fixture: ComponentFixture<MensajeVisualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeVisualizarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

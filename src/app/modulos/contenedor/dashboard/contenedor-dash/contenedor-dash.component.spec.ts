import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorDashComponent } from './contenedor-dash.component';

describe('ContenedorDashComponent', () => {
  let component: ContenedorDashComponent;
  let fixture: ComponentFixture<ContenedorDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

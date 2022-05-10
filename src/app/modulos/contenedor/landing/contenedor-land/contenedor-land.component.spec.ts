import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorLandComponent } from './contenedor-land.component';

describe('ContenedorLandComponent', () => {
  let component: ContenedorLandComponent;
  let fixture: ComponentFixture<ContenedorLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorLandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

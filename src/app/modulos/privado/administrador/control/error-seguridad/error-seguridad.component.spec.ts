import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSeguridadComponent } from './error-seguridad.component';

describe('ErrorSeguridadComponent', () => {
  let component: ErrorSeguridadComponent;
  let fixture: ComponentFixture<ErrorSeguridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorSeguridadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

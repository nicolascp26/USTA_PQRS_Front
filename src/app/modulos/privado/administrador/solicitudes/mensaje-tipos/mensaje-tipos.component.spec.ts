import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeTiposComponent } from './mensaje-tipos.component';

describe('MensajeTiposComponent', () => {
  let component: MensajeTiposComponent;
  let fixture: ComponentFixture<MensajeTiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeTiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

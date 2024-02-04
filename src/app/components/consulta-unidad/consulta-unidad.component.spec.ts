import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaUnidadComponent } from './consulta-unidad.component';

describe('ConsultaUnidadComponent', () => {
  let component: ConsultaUnidadComponent;
  let fixture: ComponentFixture<ConsultaUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaUnidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

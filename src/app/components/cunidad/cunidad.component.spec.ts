import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CunidadComponent } from './cunidad.component';

describe('CunidadComponent', () => {
  let component: CunidadComponent;
  let fixture: ComponentFixture<CunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CunidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAsesorComponent } from './create-asesor.component';

describe('CreateAsesorComponent', () => {
  let component: CreateAsesorComponent;
  let fixture: ComponentFixture<CreateAsesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAsesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

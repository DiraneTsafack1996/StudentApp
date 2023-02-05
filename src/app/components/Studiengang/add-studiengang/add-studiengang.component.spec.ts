import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudiengangComponent } from './add-studiengang.component';

describe('AddStudiengangComponent', () => {
  let component: AddStudiengangComponent;
  let fixture: ComponentFixture<AddStudiengangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudiengangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudiengangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

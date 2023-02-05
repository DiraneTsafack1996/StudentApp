import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudiengangComponent } from './edit-studiengang.component';

describe('EditStudiengangComponent', () => {
  let component: EditStudiengangComponent;
  let fixture: ComponentFixture<EditStudiengangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStudiengangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudiengangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

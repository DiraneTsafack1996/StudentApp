import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnotestudentComponent } from './addnotestudent.component';

describe('AddnotestudentComponent', () => {
  let component: AddnotestudentComponent;
  let fixture: ComponentFixture<AddnotestudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnotestudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnotestudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

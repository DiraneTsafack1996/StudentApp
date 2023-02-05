import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListnotestudentComponent } from './listnotestudent.component';

describe('ListnotestudentComponent', () => {
  let component: ListnotestudentComponent;
  let fixture: ComponentFixture<ListnotestudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListnotestudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListnotestudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFachComponent } from './add-fach.component';

describe('AddFachComponent', () => {
  let component: AddFachComponent;
  let fixture: ComponentFixture<AddFachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

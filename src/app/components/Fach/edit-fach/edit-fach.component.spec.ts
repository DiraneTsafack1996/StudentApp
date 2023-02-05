import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFachComponent } from './edit-fach.component';

describe('EditFachComponent', () => {
  let component: EditFachComponent;
  let fixture: ComponentFixture<EditFachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

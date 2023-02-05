import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNoteOneStudentComponent } from './view-note-one-student.component';

describe('ViewNoteOneStudentComponent', () => {
  let component: ViewNoteOneStudentComponent;
  let fixture: ComponentFixture<ViewNoteOneStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNoteOneStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNoteOneStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

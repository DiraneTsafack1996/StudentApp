import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudiengangComponent } from './list-studiengang.component';

describe('ListStudiengangComponent', () => {
  let component: ListStudiengangComponent;
  let fixture: ComponentFixture<ListStudiengangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStudiengangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStudiengangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

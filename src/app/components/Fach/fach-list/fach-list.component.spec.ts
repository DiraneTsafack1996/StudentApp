import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FachListComponent } from './fach-list.component';

describe('FachListComponent', () => {
  let component: FachListComponent;
  let fixture: ComponentFixture<FachListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FachListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FachListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModuleStudiengangComponent } from './add-module-studiengang.component';

describe('AddModuleStudiengangComponent', () => {
  let component: AddModuleStudiengangComponent;
  let fixture: ComponentFixture<AddModuleStudiengangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModuleStudiengangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModuleStudiengangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModuleStudiengangComponent } from './list-module-studiengang.component';

describe('ListModuleStudiengangComponent', () => {
  let component: ListModuleStudiengangComponent;
  let fixture: ComponentFixture<ListModuleStudiengangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListModuleStudiengangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListModuleStudiengangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousCategoriesEditComponent } from './sous-categories-edit.component';

describe('SousCategoriesEditComponent', () => {
  let component: SousCategoriesEditComponent;
  let fixture: ComponentFixture<SousCategoriesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousCategoriesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousCategoriesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

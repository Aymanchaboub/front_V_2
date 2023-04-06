import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousCategoriesListComponent } from './sous-categories-list.component';

describe('SousCategoriesListComponent', () => {
  let component: SousCategoriesListComponent;
  let fixture: ComponentFixture<SousCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousCategoriesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

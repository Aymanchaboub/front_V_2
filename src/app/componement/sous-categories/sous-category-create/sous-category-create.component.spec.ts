import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousCategoryCreateComponent } from './sous-category-create.component';

describe('SousCategoryCreateComponent', () => {
  let component: SousCategoryCreateComponent;
  let fixture: ComponentFixture<SousCategoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousCategoryCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

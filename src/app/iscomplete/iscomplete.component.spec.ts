import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IscompleteComponent } from './iscomplete.component';

describe('IscompleteComponent', () => {
  let component: IscompleteComponent;
  let fixture: ComponentFixture<IscompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IscompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IscompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

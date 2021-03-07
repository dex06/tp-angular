import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentModifyComponent } from './assignment-modify.component';

describe('AssignmentModifyComponent', () => {
  let component: AssignmentModifyComponent;
  let fixture: ComponentFixture<AssignmentModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

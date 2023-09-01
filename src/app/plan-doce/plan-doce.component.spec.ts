import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDoceComponent } from './plan-doce.component';

describe('PlanDoceComponent', () => {
  let component: PlanDoceComponent;
  let fixture: ComponentFixture<PlanDoceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanDoceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanDoceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

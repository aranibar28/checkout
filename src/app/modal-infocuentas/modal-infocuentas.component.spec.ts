import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfocuentasComponent } from './modal-infocuentas.component';

describe('ModalInfocuentasComponent', () => {
  let component: ModalInfocuentasComponent;
  let fixture: ComponentFixture<ModalInfocuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInfocuentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInfocuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

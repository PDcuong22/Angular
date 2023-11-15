import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanHoComponent } from './can-ho.component';

describe('CanHoComponent', () => {
  let component: CanHoComponent;
  let fixture: ComponentFixture<CanHoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanHoComponent]
    });
    fixture = TestBed.createComponent(CanHoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

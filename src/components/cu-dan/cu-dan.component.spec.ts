import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuDanComponent } from './cu-dan.component';

describe('CuDanComponent', () => {
  let component: CuDanComponent;
  let fixture: ComponentFixture<CuDanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuDanComponent]
    });
    fixture = TestBed.createComponent(CuDanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShrinkComponent } from './shrink.component';

describe('ShrinkComponent', () => {
  let component: ShrinkComponent;
  let fixture: ComponentFixture<ShrinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShrinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

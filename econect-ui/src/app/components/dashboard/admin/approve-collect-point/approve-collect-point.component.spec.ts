import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCollectPointComponent } from './approve-collect-point.component';

describe('ApproveCollectPointComponent', () => {
  let component: ApproveCollectPointComponent;
  let fixture: ComponentFixture<ApproveCollectPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveCollectPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCollectPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

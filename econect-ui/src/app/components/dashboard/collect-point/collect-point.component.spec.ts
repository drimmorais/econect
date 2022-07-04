import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectPointComponent } from './collect-point.component';

describe('CollectPointComponent', () => {
  let component: CollectPointComponent;
  let fixture: ComponentFixture<CollectPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

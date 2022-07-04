import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenNavComponent } from './green-nav.component';

describe('GreenNavComponent', () => {
  let component: GreenNavComponent;
  let fixture: ComponentFixture<GreenNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

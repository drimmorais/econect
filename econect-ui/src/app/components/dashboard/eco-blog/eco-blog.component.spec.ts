import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoBlogComponent } from './eco-blog.component';

describe('EcoBlogComponent', () => {
  let component: EcoBlogComponent;
  let fixture: ComponentFixture<EcoBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

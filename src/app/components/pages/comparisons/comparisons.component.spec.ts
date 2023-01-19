import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonsComponent } from './comparisons.component';

describe('DayOneComponent', () => {
  let component: ComparisonsComponent;
  let fixture: ComponentFixture<ComparisonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparisonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

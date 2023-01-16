import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTypeSelectorComponent } from './chart-type-selector.component';

describe('ChartTypeSelectorComponent', () => {
  let component: ChartTypeSelectorComponent;
  let fixture: ComponentFixture<ChartTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTypeSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

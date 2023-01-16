import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralStatsComponent } from './general-stats.component';

describe('HomeComponent', () => {
  let component: GeneralStatsComponent;
  let fixture: ComponentFixture<GeneralStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

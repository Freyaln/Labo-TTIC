import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecboxSelectorComponent } from './checbox-selector.component';

describe('ChecboxSelectorComponent', () => {
  let component: ChecboxSelectorComponent;
  let fixture: ComponentFixture<ChecboxSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChecboxSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChecboxSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

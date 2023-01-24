import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesDatasComponent } from './companies-datas.component';

describe('HomeComponent', () => {
  let component: CompaniesDatasComponent;
  let fixture: ComponentFixture<CompaniesDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesDatasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniesDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

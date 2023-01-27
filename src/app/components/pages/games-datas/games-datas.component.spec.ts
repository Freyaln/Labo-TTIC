import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesDatasComponent } from './games-datas.component';

describe('GamesDatasComponent', () => {
  let component: GamesDatasComponent;
  let fixture: ComponentFixture<GamesDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesDatasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

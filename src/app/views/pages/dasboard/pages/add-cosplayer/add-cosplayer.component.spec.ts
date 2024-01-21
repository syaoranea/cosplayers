import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCosplayerComponent } from './add-cosplayer.component';

describe('AddCosplayerComponent', () => {
  let component: AddCosplayerComponent;
  let fixture: ComponentFixture<AddCosplayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCosplayerComponent]
    });
    fixture = TestBed.createComponent(AddCosplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

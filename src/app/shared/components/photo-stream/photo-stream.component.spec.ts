import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoStreamComponent } from './photo-stream.component';

describe('PhotoStreamComponent', () => {
  let component: PhotoStreamComponent;
  let fixture: ComponentFixture<PhotoStreamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoStreamComponent]
    });
    fixture = TestBed.createComponent(PhotoStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

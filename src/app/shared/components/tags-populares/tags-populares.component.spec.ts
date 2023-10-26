import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsPopularesComponent } from './tags-populares.component';

describe('TagsPopularesComponent', () => {
  let component: TagsPopularesComponent;
  let fixture: ComponentFixture<TagsPopularesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagsPopularesComponent]
    });
    fixture = TestBed.createComponent(TagsPopularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

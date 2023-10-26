import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurarComponent } from './procurar.component';

describe('ProcurarComponent', () => {
  let component: ProcurarComponent;
  let fixture: ComponentFixture<ProcurarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcurarComponent]
    });
    fixture = TestBed.createComponent(ProcurarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCrudComponent } from './articulo-crud.component';

describe('ArticuloCrudComponent', () => {
  let component: ArticuloCrudComponent;
  let fixture: ComponentFixture<ArticuloCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParcsComponent } from './list-parcs.component';

describe('ListParcsComponent', () => {
  let component: ListParcsComponent;
  let fixture: ComponentFixture<ListParcsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListParcsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListParcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

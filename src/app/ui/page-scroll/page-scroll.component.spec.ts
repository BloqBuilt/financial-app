import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageScrollComponent } from './page-scroll.component';

describe('PageScrollComponent', () => {
  let component: PageScrollComponent;
  let fixture: ComponentFixture<PageScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

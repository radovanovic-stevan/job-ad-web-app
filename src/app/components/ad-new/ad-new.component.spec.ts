import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdNewComponent } from './ad-new.component';

describe('AdNewComponent', () => {
  let component: AdNewComponent;
  let fixture: ComponentFixture<AdNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

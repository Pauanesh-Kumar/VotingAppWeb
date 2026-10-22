import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesNewComponent } from './candidates-new.component';

describe('CandidatesNewComponent', () => {
  let component: CandidatesNewComponent;
  let fixture: ComponentFixture<CandidatesNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatesNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatesNewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

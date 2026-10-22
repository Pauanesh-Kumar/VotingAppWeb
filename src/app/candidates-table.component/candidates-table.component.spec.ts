import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesTableComponent } from './candidates-table.component';

describe('CandidatesTableComponent', () => {
  let component: CandidatesTableComponent;
  let fixture: ComponentFixture<CandidatesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatesTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

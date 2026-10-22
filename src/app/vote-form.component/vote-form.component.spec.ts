import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteFormComponent } from './vote-form.component';

describe('VoteFormComponent', () => {
  let component: VoteFormComponent;
  let fixture: ComponentFixture<VoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotersTableComponent } from './voters-table.component';

describe('VotersTableComponent', () => {
  let component: VotersTableComponent;
  let fixture: ComponentFixture<VotersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotersTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotersTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

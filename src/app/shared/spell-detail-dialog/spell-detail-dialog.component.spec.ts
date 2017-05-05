import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellDetailDialogComponent } from './spell-detail-dialog.component';

describe('SpellDetailDialogComponent', () => {
  let component: SpellDetailDialogComponent;
  let fixture: ComponentFixture<SpellDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

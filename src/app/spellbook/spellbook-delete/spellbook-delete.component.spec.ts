import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellbookDeleteComponent } from './spellbook-delete.component';

describe('SpellbookDeleteComponent', () => {
  let component: SpellbookDeleteComponent;
  let fixture: ComponentFixture<SpellbookDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellbookDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellbookDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

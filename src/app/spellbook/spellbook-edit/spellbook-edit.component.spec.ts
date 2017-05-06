import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellbookEditComponent } from './spellbook-edit.component';

describe('SpellbookEditComponent', () => {
  let component: SpellbookEditComponent;
  let fixture: ComponentFixture<SpellbookEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellbookEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellbookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellbookListComponent } from './spellbook-list.component';

describe('SpellbookListComponent', () => {
  let component: SpellbookListComponent;
  let fixture: ComponentFixture<SpellbookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellbookListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellbookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

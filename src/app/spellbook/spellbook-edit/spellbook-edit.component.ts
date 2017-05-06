import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spellbook-edit',
  templateUrl: './spellbook-edit.component.html',
  styleUrls: ['./spellbook-edit.component.scss']
})
export class SpellbookEditComponent implements OnInit {
  public sb: any;
  public classes = [
    'barbarian',
    'bard',
    'cleric',
    'druid',
    'fighter',
    'monk',
    'paladin',
    'ranger',
    'rogue',
    'sorcerer',
    'warlock',
    'wizard'
  ];
  constructor() { }

  ngOnInit() {
  }

  update(form) {
    console.log(form);
  }

}

import { Component, OnInit } from '@angular/core';
import { SpellbookService } from '../shared/spellbook.service';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})
export class SpellsComponent implements OnInit {
  private spells: Object[];
  constructor(private spellbookService: SpellbookService) { }

  ngOnInit() {
    this.spellbookService.getSpells().subscribe(s => {
      this.spells = s;
    });
  }

}

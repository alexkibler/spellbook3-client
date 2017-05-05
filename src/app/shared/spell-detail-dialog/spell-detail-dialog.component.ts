import { Component, OnInit } from '@angular/core';
import { SpellbookService } from '../spellbook.service';

@Component({
  selector: 'app-spell-detail-dialog',
  templateUrl: './spell-detail-dialog.component.html',
  styleUrls: ['./spell-detail-dialog.component.scss']
})
export class SpellDetailDialogComponent implements OnInit {
  id: number;
  spell: Object;
  constructor(private spellbookService: SpellbookService) { }

  ngOnInit() {
    const sub = this.spellbookService.getSpell(this.id).subscribe(x => {
      this.spell = x;
      sub.unsubscribe();
    });
  }

}

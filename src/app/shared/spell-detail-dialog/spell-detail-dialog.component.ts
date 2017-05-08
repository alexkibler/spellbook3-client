import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { SpellbookService } from '../spellbook.service';

@Component({
  selector: 'app-spell-detail-dialog',
  templateUrl: './spell-detail-dialog.component.html',
  styleUrls: ['./spell-detail-dialog.component.scss']
})
export class SpellDetailDialogComponent implements OnInit {
  id: number;
  spell: any;
  selectedSpellbook;
  constructor(private spellbookService: SpellbookService, public dialogRef: MdDialogRef<SpellDetailDialogComponent>,) { }

  ngOnInit() {
    const sub = this.spellbookService.getSpell(this.id).subscribe(x => {
      this.spell = x;
      sub.unsubscribe();
    });
    this.selectedSpellbook = this.spellbookService.selectedSpellbook.getValue();
  }

  isSelected() {
    if (this.selectedSpellbook && this.selectedSpellbook.spells) {
      for (let i = 0; i < this.selectedSpellbook.spells.length; i++) {
        if (this.selectedSpellbook.spells[i].id === this.spell.spellId) {
          return true;
        }
      }
    }
    return false;
  }
  add() {
    const sub = this.spellbookService.addSpell({spellbookId: this.selectedSpellbook.spellbookId, spellId: this.spell.spellId}).subscribe(r => {
      sub.unsubscribe();
      const sub2 = this.spellbookService.getSpellbook(this.selectedSpellbook.spellbookId).subscribe(s => {
        sub2.unsubscribe();
        this.spellbookService.setSpellbook(s);
        this.dialogRef.close();
      });
    });
  }

  remove() {
    const sub = this.spellbookService.deleteSpellFromSpellbook({spellbookId: this.selectedSpellbook.spellbookId, spellId: this.spell.spellId}).subscribe(() => {
      sub.unsubscribe();
      const sub2 = this.spellbookService.getSpellbook(this.selectedSpellbook.spellbookId).subscribe(s => {
        sub2.unsubscribe();
        this.spellbookService.setSpellbook(s);
        this.dialogRef.close();
      });
    });
  }
}

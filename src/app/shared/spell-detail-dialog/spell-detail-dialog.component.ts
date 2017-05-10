import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { SpellbookService } from '../spellbook.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../../auth/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-spell-detail-dialog',
  templateUrl: './spell-detail-dialog.component.html',
  styleUrls: ['./spell-detail-dialog.component.scss']
})
export class SpellDetailDialogComponent implements OnInit {
  spell: any;
  readonly = true;
  public form: FormGroup;
  selectedSpellbook;
  constructor(
    private spellbookService: SpellbookService,
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<SpellDetailDialogComponent>,
    public auth: Auth
  ) { }

  ngOnInit() {
    this.selectedSpellbook = this.spellbookService.selectedSpellbook.getValue();
    let spellCopy: any = {};
    if (this.spell) {
      spellCopy = _.cloneDeep(this.spell);
    }
    this.form = this.fb.group({
      name: [spellCopy.name, [Validators.required]],
      level: [spellCopy.level, []],
      class: [spellCopy.class, []],
      description: [spellCopy.desc, []],
      higher_level: [spellCopy.higher_level, []],
      school: [spellCopy.school, []],
      ritual: [spellCopy.ritual, []],
      circles: [spellCopy.circles, []],
      domains: [spellCopy.domains, []],
      oaths: [spellCopy.oaths, []],
      patrons: [spellCopy.patrons, []],
      duration: [spellCopy.duration, []],
      concentration: [spellCopy.concentration, []],
      components: [spellCopy.components, []],
      casting_time: [spellCopy.casting_time, []],
      page: [spellCopy.page, []],
    });
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

  update(form: FormGroup) {
    if (form.valid) {
      const spell = _.cloneDeep(this.spell);
      const fv = form.value;
      spell.name = fv.name;
      spell.level = fv.level;
      spell.class = fv.class;
      spell.description = fv.description;
      spell.higher_level = fv.higher_level;
      spell.school = fv.school;
      spell.ritual = fv.ritual;
      spell.duration = fv.duration;
      spell.concentration = fv.concentration;
      spell.components = fv.components;
      spell.circles = fv.circles;
      spell.casting_time = fv.casting_time;
      spell.page = fv.page;
      const sub = this.spellbookService.updateSpell(spell).subscribe(x => {
        sub.unsubscribe();
        this.dialogRef.close();

      });
    }
  }


  add() {
    const sub = this.spellbookService.addSpell(
      { spellbookId: this.selectedSpellbook.spellbookId, spellId: this.spell.spellId })
      .subscribe(r => {
        sub.unsubscribe();
        const sub2 = this.spellbookService.getSpellbook(this.selectedSpellbook.spellbookId).subscribe(s => {
          sub2.unsubscribe();
          this.spellbookService.setSpellbook(s);
          this.dialogRef.close();
        });
      });
  }

  remove() {
    const sub = this.spellbookService.deleteSpellFromSpellbook(
      { spellbookId: this.selectedSpellbook.spellbookId, spellId: this.spell.spellId })
      .subscribe(() => {
        sub.unsubscribe();
        const sub2 = this.spellbookService.getSpellbook(this.selectedSpellbook.spellbookId).subscribe(s => {
          sub2.unsubscribe();
          this.spellbookService.setSpellbook(s);
          this.dialogRef.close();
        });
      });
  }
}

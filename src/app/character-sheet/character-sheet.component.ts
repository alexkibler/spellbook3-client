import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpellbookService } from '../shared/spellbook.service';
import { ToasterService } from 'angular2-toaster';
import * as _ from 'lodash';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent implements OnInit {
  public id: number;
  private sub: any;
  public passivePerception = 0;
  public characterSheet: any = {};
  public modifiers = {
    str: '0',
    dex: '0',
    con: '0',
    int: '0',
    wis: '0',
    cha: '0',
  };

  constructor(
    private spellbookService: SpellbookService,
    private route: ActivatedRoute,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      const sub = this.spellbookService.getCharacterSheet(this.id).subscribe(d => {
        if (d.classLevels.length === 0) {
          d.classLevels.push({});
        }
        if (d.ammos.length === 0) {
          d.ammos.push({});
        }
        if (d.attacks.length === 0) {
          d.attacks.push({});
        }
        this.characterSheet = d;
        for (const stat in this.modifiers) {
          if (this.modifiers.hasOwnProperty(stat)) {
            this.updateMod(stat);
          }
        }
        sub.unsubscribe();
      });
      // In a real app: dispatch action to load the details here.
    });
  }

  addClass() {
    this.characterSheet.classLevels.push({});
  }

  removeClass(i) {
    this.characterSheet.classLevels.splice(i, 1);
  }

  addAttack() {
    this.characterSheet.attacks.push({});
  }

  removeAttack(i) {
    this.characterSheet.attacks.splice(i, 1);
  }

  addAmmo() {
    this.characterSheet.ammos.push({});
  }

  removeAmmo(i) {
    this.characterSheet.ammos.splice(i, 1);
  }

  updateMod(stat) {
    let modifier = 0;
    let val = 0;
    switch (stat) {
      case 'str':
        val = this.characterSheet.abilityScores.strength;
        break;
      case 'dex':
        val = this.characterSheet.abilityScores.dexterity;
        break;
      case 'con':
        val = this.characterSheet.abilityScores.constitution;
        break;
      case 'int':
        val = this.characterSheet.abilityScores.intelligence;
        break;
      case 'wis':
        val = this.characterSheet.abilityScores.wisdom;
        break;
      case 'cha':
        val = this.characterSheet.abilityScores.charisma;
        break;
    }
    modifier = Math.floor((+val / 2) - 5);
    if (modifier > 0) {
      this.modifiers[stat] = `+${modifier.toString()}`;
    } else {
      this.modifiers[stat] = modifier.toString();
    }
  }

  saveChanges() {
    const sub = this.spellbookService.updateCharacterSheet(this.characterSheet).subscribe(() => {
      this.toasterService.pop('success', 'Success', 'Saved Changes');
      sub.unsubscribe();
    });
  }


}

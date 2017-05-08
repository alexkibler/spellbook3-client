import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Auth } from '../../auth/auth.service';
import { SpellbookService } from '../../shared/spellbook.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-spellbook-edit',
  templateUrl: './spellbook-edit.component.html',
  styleUrls: ['./spellbook-edit.component.scss']
})
export class SpellbookEditComponent implements OnInit {
  public sb: any;
  public mode: string;
  public form: FormGroup;
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
  constructor(private sbs: SpellbookService, private fb: FormBuilder, public dialogRef: MdDialogRef<SpellbookEditComponent>, public auth: Auth) { }

  ngOnInit() {
    let spellbookCopy: any = {};
    if (this.sb) {
      spellbookCopy = _.cloneDeep(this.sb);
    }
    this.form = this.fb.group({
      name: [spellbookCopy.name, [Validators.required]],
      description: [spellbookCopy.description],
      class: [spellbookCopy.class, [Validators.required]],
      // imageUrl: [spellbookCopy.imageUrl],
      characterSheetUrl: [spellbookCopy.characterSheetUrl]
    });
  }

  update(form: FormGroup) {
    if (this.mode === 'EDIT') {
      if (form.valid) {
        const sb = _.cloneDeep(this.sb);
        const fv = form.value;
        sb.name = fv.name;
        sb.class = fv.class;
        sb.description = fv.description;
        // sb.imageUrl = fv.imageUrl;
        sb.characterSheetUrl = fv.characterSheetUrl;
        const sub = this.sbs.updateSpellbook(sb).subscribe(x => {
          sub.unsubscribe();
          this.dialogRef.close(sb);

        });
      }
    } else if (this.mode === 'ADD') {
      if (form.valid) {
        const sb: any = {};
        const fv = form.value;
        sb.name = fv.name;
        sb.class = fv.class;
        sb.description = fv.description;
        sb.userId = this.auth.userProfile.user_id;
        // sb.imageUrl = fv.imageUrl;
        sb.characterSheetUrl = fv.characterSheetUrl;
        const sub = this.sbs.addSpellbook(sb).subscribe(x => {
          sub.unsubscribe();
          this.dialogRef.close(sb);
        });
      }
    }
  }

}

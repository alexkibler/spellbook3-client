import { Component, OnInit } from '@angular/core';
import { SpellbookService } from '../../shared/spellbook.service';
import { Auth } from '../../auth/auth.service';
import { MdDialog } from '@angular/material';
import { SpellbookEditComponent } from '../spellbook-edit/spellbook-edit.component';
@Component({
  selector: 'app-spellbook-list',
  templateUrl: './spellbook-list.component.html',
  styleUrls: ['./spellbook-list.component.scss']
})
export class SpellbookListComponent implements OnInit {
  spellbooks: any[];
  constructor(private sbs: SpellbookService, private auth: Auth, public dialog: MdDialog) { }

  ngOnInit() {
    const userId = this.auth.userProfile.user_id;
    const sub = this.sbs.getSpellbooksByUserId(userId).subscribe(x => {
      this.spellbooks = x;
      sub.unsubscribe();
    });
  }
  edit(sb: any) {
    const dialogRef = this.dialog.open(SpellbookEditComponent, );
    dialogRef.componentInstance.sb = sb;
  }

}

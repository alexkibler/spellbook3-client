import { Component, OnInit } from '@angular/core';
import { SpellbookService } from '../../shared/spellbook.service';
import { Auth } from '../../auth/auth.service';
import { MdDialog } from '@angular/material';
import { SpellbookEditComponent } from '../spellbook-edit/spellbook-edit.component';
import { SpellbookDeleteComponent } from '../spellbook-delete/spellbook-delete.component';
@Component({
  selector: 'app-spellbook-list',
  templateUrl: './spellbook-list.component.html',
  styleUrls: ['./spellbook-list.component.scss']
})
export class SpellbookListComponent implements OnInit {
  spellbooks: any[];
  constructor(private sbs: SpellbookService, private auth: Auth, public dialog: MdDialog) { }

  ngOnInit() {
    this.getSpellbooks();
  }

  getSpellbooks() {
    const userId = this.auth.userProfile.user_id;
    const sub = this.sbs.getSpellbooksByUserId(userId).subscribe(x => {
      this.spellbooks = x;
      sub.unsubscribe();
    });
  }
  spells(sb: any) {
    this.sbs.setSpellbook(sb);
  }
  add() {
    const dialogRef = this.dialog.open(SpellbookEditComponent);
    dialogRef.componentInstance.mode = 'ADD';
    const sub = dialogRef.afterClosed().subscribe(r => {
      sub.unsubscribe();
      this.getSpellbooks();
    });
  }
  edit(sb: any) {
    const dialogRef = this.dialog.open(SpellbookEditComponent);
    dialogRef.componentInstance.sb = sb;
    dialogRef.componentInstance.mode = 'EDIT';
    const sub = dialogRef.afterClosed().subscribe(r => {
      sub.unsubscribe();
      this.getSpellbooks();
    });
  }
  delete(sbId: number) {
    const dialogRef = this.dialog.open(SpellbookDeleteComponent);
    const sub1 = dialogRef.afterClosed().subscribe(r => {
      sub1.unsubscribe();
      if (r === 'yes') {
        const sub = this.sbs.deleteSpellbook(sbId).subscribe(() => {
          sub.unsubscribe();
          this.getSpellbooks();
        });
      }
    });
  }
}

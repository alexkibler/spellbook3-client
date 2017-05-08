import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-spellbook-delete',
  templateUrl: './spellbook-delete.component.html',
  styleUrls: ['./spellbook-delete.component.scss']
})
export class SpellbookDeleteComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<SpellbookDeleteComponent>) { }

  ngOnInit() {
  }

}

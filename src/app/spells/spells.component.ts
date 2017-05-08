import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { SpellbookService } from '../shared/spellbook.service';
import { SpellDetailDialogComponent } from '../shared/spell-detail-dialog/spell-detail-dialog.component';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})
export class SpellsComponent implements OnInit {
  public spells: any[];
  private temp: any[];
  private nameFilter: string;
  private classFilter: string;
  public levelFilter: string;
  private columns = [
    { prop: 'id' },
    { prop: 'name' },
    { name: 'level' },
    { name: 'class' }
  ];

  constructor(private spellbookService: SpellbookService, public dialog: MdDialog) { }

  ngOnInit() {
    this.spellbookService.getSpells().subscribe(s => {
      this.spells = s;
      this.temp = [...s];
    });
  }

  onSelect({ row }) {
    console.log(row.id);
    const dialogRef = this.dialog.open(SpellDetailDialogComponent);
    dialogRef.componentInstance.id = row.id;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const nameFilter = this.nameFilter;
    const levelFilter = this.levelFilter;
    const classFilter = this.classFilter;
    // filter our data
    let temp = this.temp;
    if (nameFilter) {
    temp = temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(nameFilter) !== -1 || !nameFilter;
    });
    }
    if (classFilter) {
    temp = temp.filter(function(d) {
      return d.class.toLowerCase().indexOf(classFilter) !== -1 || !classFilter;
    });
    }

    if (levelFilter) {
    temp = temp.filter(function(d) {
      return d.level.toLowerCase().indexOf(levelFilter) !== -1 || !levelFilter;
    });
    }
    // const filter = { name: nameFilter, level: levelFilter, class: classFilter };
    // const temp = this.temp.filter(item => {
    //   const notMatchingField = Object.keys(filter)
    //     .find(key => item[key] !== filter[key]);

    //   return !notMatchingField; // true if matches all fields
    // });


    // update the rows
    this.spells = temp;
  }

}

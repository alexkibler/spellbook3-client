import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import * as _ from 'lodash';
import { SpellbookService } from '../shared/spellbook.service';
import { SpellDetailDialogComponent } from '../shared/spell-detail-dialog/spell-detail-dialog.component';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})
export class SpellsComponent implements OnInit {
  public spells: any[];
  public sortOrder = 'name';
  public sortAsc = true;
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
      this.sort();
    });
  }

  onSelect(spell) {
    console.log(spell.id);
    const dialogRef = this.dialog.open(SpellDetailDialogComponent);
    dialogRef.componentInstance.id = spell.id;
  }

  add(s) {
    alert('placebo!');
  }

  remove(s) {
    alert('placebo!');
  }

  changeSort(name) {
    if (this.sortOrder === name) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortOrder = name;
      this.sortAsc = true;
    }

    this.sort();
  }

  filter(type, val) {
    switch (type) {
      case 'name':
        this.nameFilter = val;
        break;
      case 'level':
        this.levelFilter = val;
        break;
      case 'class':
        this.classFilter = val;
        break;
    }

    this.updateFilter();
    this.sort();
  }

  sort() {
    this.spells = _.orderBy(this.spells, [this.sortOrder], [this.sortAsc ? 'asc' : 'desc']);
  }

  updateFilter() {
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

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  public spell: any;
  public sortOrder = 'name';
  public sortAsc = true;
  public spellbookOnly = false;
  public id: number;
  private temp: any[];
  private nameFilter: string;
  private classFilter: string;
  public levelFilter: string;
  public selectedSpellbook;
  private columns = [
    { prop: 'id' },
    { prop: 'name' },
    { name: 'level' },
    { name: 'class' }
  ];

  constructor(
    private spellbookService: SpellbookService,
    public dialog: MdDialog,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.getSpells();
    this.selectedSpellbook = this.spellbookService.selectedSpellbook.getValue();
    this.spellbookService.selectedSpellbook.subscribe(x => {
      this.selectedSpellbook = x;
    });
  }

  getSpells() {
    const sub = this.spellbookService.getSpells().subscribe(s => {
      this.spells = s;
      this.temp = [...s];
      this.sort();
      if (this.id) {
        this.onSelect(s.find(x => x.id === this.id));
      }
    });
  }

  isSelected(spellId) {
    if (this.selectedSpellbook && this.selectedSpellbook.spells) {
      for (let i = 0; i < this.selectedSpellbook.spells.length; i++) {
        if (this.selectedSpellbook.spells[i].id === spellId) {
          return true;
        }
      }
    }
    return false;
  }

  onSelect(spell) {
    this.router.navigate(['/spells', spell.id]);
    const sub = this.spellbookService.getSpell(spell.id).subscribe(x => {
      this.spell = x;
      window.scrollTo(0,0);
    });
  }

  add(id) {
    const sub = this.spellbookService.addSpell({ spellbookId: this.selectedSpellbook.spellbookId, spellId: id }).subscribe(r => {
      sub.unsubscribe();
      const sub2 = this.spellbookService.getSpellbook(this.selectedSpellbook.spellbookId).subscribe(s => {
        sub2.unsubscribe();
        this.spellbookService.setSpellbook(s);
      });
    });
  }

  remove(id) {
    const sub = this.spellbookService.deleteSpellFromSpellbook(
      { spellbookId: this.selectedSpellbook.spellbookId, spellId: id })
      .subscribe(() => {
        sub.unsubscribe();
        const sub2 = this.spellbookService.getSpellbook(this.selectedSpellbook.spellbookId).subscribe(s => {
          sub2.unsubscribe();
          this.spellbookService.setSpellbook(s);
        });
      });
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
        this.nameFilter = val.toLowerCase();
        break;
      case 'level':
        this.levelFilter = val;
        break;
      case 'class':
        this.classFilter = val.toLowerCase();
        break;
      case 'sbOnly':
        this.spellbookOnly = val;
    }

    if (type === 'sbOnly') {
      // delay so the toggle doesn't lag
      setTimeout(() => {

        this.updateFilter();
        this.sort();
      }, 50);
    } else {
      this.updateFilter();
      this.sort();
    }

  }

  resetSpell() {
    this.spell = undefined;
    this.router.navigate(['/spells', '']);
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
    if (this.spellbookOnly) {
      temp = this.temp.filter(x => this.isSelected(x.id));
    }
    if (nameFilter) {
      temp = temp.filter(function (d) {
        return d.name.toLowerCase().indexOf(nameFilter) !== -1 || !nameFilter;
      });
    }
    if (classFilter) {
      temp = temp.filter(function (d) {
        return d.class.toLowerCase().indexOf(classFilter) !== -1 || !classFilter;
      });
    }

    if (levelFilter) {
      temp = temp.filter(function (d) {
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

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Auth } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class SpellbookService {
  public selectedSpellbook: BehaviorSubject<any>;
  constructor(private http: Http, private auth: Auth) {
    this.selectedSpellbook = new BehaviorSubject({});
  }

  setSpellbook(sb) {
    this.selectedSpellbook.next(sb);
  }

  getSpells() {
    return this.http.get('http://spellbookapi.alexkibler.com/spells/GetSpellList').map((response) => response.json());
  }

  getSpellbook(id) {
    return this.http.get(`http://spellbookapi.alexkibler.com/spellbooks/${id}`).map((response) => response.json());
  }

  getSpell(id: number) {
    return this.http.get(`http://spellbookapi.alexkibler.com/spells/${id}`).map((response) => response.json());
  }

  addSpell(spellbookspell) {
    return this.http.post('http://spellbookapi.alexkibler.com/spellbooks/addspell', spellbookspell).map((response) => response.json());
  }

  deleteSpellFromSpellbook(spellbookspell) {
    return this.http.post('http://spellbookapi.alexkibler.com/spellbooks/DeleteSpell', spellbookspell);
  }

  getSpellbooksByUserId(userId: string) {
    return this.http.get(`http://spellbookapi.alexkibler.com/spellbooks/GetSpellbooksByUserId/${userId}`)
      .map((response) => response.json());
  }

  deleteSpellbook(sbId: number) {
    return this.http.post(`http://spellbookapi.alexkibler.com/spellbooks/delete/${sbId}`, {})
      .map((response) => response.json());
  }

  updateSpellbook(spellbook: any) {
    return this.http.put(`http://spellbookapi.alexkibler.com/spellbooks/${spellbook.spellbookId}`, spellbook)
      .map((response) => response.json());
  }

  addSpellbook(spellbook: any) {
    return this.http.post(`http://spellbookapi.alexkibler.com/spellbooks`, spellbook)
      .map((response) => response.json());
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Auth } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class SpellbookService {
  public selectedSpellbook: BehaviorSubject<any>;
  // public apiUrl = 'http://localhost:62940';
  public apiUrl = 'http://spellbookapi.alexkibler.com';
  constructor(private http: Http, private auth: Auth) {
    this.selectedSpellbook = new BehaviorSubject({});
  }

  setSpellbook(sb) {
    this.selectedSpellbook.next(sb);
  }

  getSpells() {
    return this.http.get(this.apiUrl + '/spells/GetSpellList').map((response) => response.json());
  }

  getSpellbook(id) {
    return this.http.get(`${this.apiUrl}/spellbooks/${id}`).map((response) => response.json());
  }

  getSpell(id: number) {
    return this.http.get(`${this.apiUrl}/spells/${id}`).map((response) => response.json());
  }

  updateSpell(spell: any) {
    return this.http.put(`${this.apiUrl}/spells/${spell.spellId}`, spell)
      .map((response) => response.json());
  }

  addSpell(spellbookspell) {
    return this.http.post(this.apiUrl + '/spellbooks/addspell', spellbookspell).map((response) => response.json());
  }

  deleteSpellFromSpellbook(spellbookspell) {
    return this.http.post(this.apiUrl + '/spellbooks/DeleteSpell', spellbookspell);
  }

  getSpellbooksByUserId(userId: string) {
    return this.http.get(`${this.apiUrl}/spellbooks/GetSpellbooksByUserId/${userId}`)
      .map((response) => response.json());
  }

  deleteSpellbook(sbId: number) {
    return this.http.post(`${this.apiUrl}/spellbooks/delete/${sbId}`, {})
      .map((response) => response.json());
  }

  updateSpellbook(spellbook: any) {
    return this.http.put(`${this.apiUrl}/spellbooks/${spellbook.spellbookId}`, spellbook)
      .map((response) => response.json());
  }

  addSpellbook(spellbook: any) {
    return this.http.post(`${this.apiUrl}/spellbooks`, spellbook)
      .map((response) => response.json());
  }
}

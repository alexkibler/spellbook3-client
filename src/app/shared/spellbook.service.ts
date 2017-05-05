import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Auth } from '../auth/auth.service';
@Injectable()
export class SpellbookService {

  constructor(private http: Http, private auth: Auth) { }

  getSpells() {
    return this.http.get('http://localhost:62940/api/spells/GetSpellList').map((response) => response.json());
  }

  getSpell(id: number) {
    return this.http.get(`http://localhost:62940/api/spells/${id}`).map((response) => response.json());
  }

  getSpellbooksByUserId(userId: string) {
    return this.http.get(`http://localhost:62940/api/spellbooks/GetSpellbooksByUserId/${userId}`)
      .map((response) => response.json());
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class SpellbookService {

  constructor(private http: Http) { }

  getSpells() {
    return this.http.get('http://localhost:62940/api/spells').map((response) => response.json());
  }
}

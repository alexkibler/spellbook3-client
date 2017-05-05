import { Component, OnInit } from '@angular/core';
import { SpellbookService } from '../../shared/spellbook.service';
import { Auth } from '../../auth/auth.service';
@Component({
  selector: 'app-spellbook-list',
  templateUrl: './spellbook-list.component.html',
  styleUrls: ['./spellbook-list.component.scss']
})
export class SpellbookListComponent implements OnInit {
  spellbooks: any[];
  constructor(private sbs: SpellbookService, private auth: Auth) { }

  ngOnInit() {
    const userId = this.auth.userProfile.user_id;
    const sub = this.sbs.getSpellbooksByUserId(userId).subscribe(x => {
      this.spellbooks = x;
      sub.unsubscribe();
    });
  }

}

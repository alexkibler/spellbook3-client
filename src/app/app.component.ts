import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './auth/auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MdDialog, MdDialogRef, MdSnackBar, MdSidenav } from '@angular/material';
import { SpellbookService } from './shared/spellbook.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  @ViewChild('sidenav') sidenav: MdSidenav;
  theme = 'dark';
  sb: any;
  constructor(public auth: Auth, private http: Http, private router: Router, private sbs: SpellbookService) { 
    this.sbs.selectedSpellbook.subscribe(s => {
      this.sb = s;
    });
  }

  public login() {
    this.router.navigateByUrl('/').then(() => {
      setTimeout(() => this.auth.login(), 500);
    });
  }

  public nav(func: string) {
    this.sidenav.close().then(() => {
      switch (func) {
        case 'spells':
          this.router.navigate(['/spells/', '']);
          break;
        case 'spellbooks':
          this.router.navigateByUrl('/spellbooks/list');
          break;
        case 'login':
          this.login();
          break;
        case 'logout':
          this.auth.logout();
          this.router.navigateByUrl('/');
          break;
      }
    });
  }
};


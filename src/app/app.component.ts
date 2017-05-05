import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './auth/auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MdDialog, MdDialogRef, MdSnackBar, MdSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  @ViewChild('sidenav') sidenav: MdSidenav;
  theme = 'dark';
  constructor(private auth: Auth, private http: Http, private router: Router) { }

  public test() {
    let headers: Headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.auth.token);
    headers.append('asdfsadf', 'Bearer ' + this.auth.token);
    let options = new RequestOptions({ headers: headers });
    this.http.get('../assets/tsconfig.app.json', options).subscribe(x => {
      console.log(x);
    });
  }

  public login() {
    this.router.navigateByUrl('/');
    this.auth.login();
  }

  public nav(func: string) {
    this.sidenav.close().then(() => {
      switch (func) {
        case 'spells':
          this.router.navigateByUrl('/spells');
          break;
        case 'spellbooks':
          this.router.navigateByUrl('/spellbooks');
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


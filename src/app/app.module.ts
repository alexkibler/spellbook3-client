import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { Auth } from './auth/auth.service';
import {
    routing,
    appRoutingProviders
} from './app.routes';
import { SpellsComponent } from './spells/spells.component';
import { SpellbookComponent } from './spellbook/spellbook.component';
import { SpellbookService } from './shared/spellbook.service';
import { SpellDetailDialogComponent } from './shared/spell-detail-dialog/spell-detail-dialog.component';
import { SpellbookListComponent } from './spellbook/spellbook-list/spellbook-list.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({}), http, options);
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SpellsComponent,
        SpellbookComponent,
        SpellDetailDialogComponent,
        SpellbookListComponent
    ],
    providers: [
        appRoutingProviders,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
        SpellbookService,
        Auth
    ],
    entryComponents: [
        SpellDetailDialogComponent
    ],
    imports: [
        BrowserModule,
        FlexLayoutModule,
        HttpModule,
        FormsModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        MaterialModule.forRoot(),
        routing
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

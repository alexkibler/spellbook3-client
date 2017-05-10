import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, Http, RequestOptions } from '@angular/http';
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
import { SpellbookEditComponent } from './spellbook/spellbook-edit/spellbook-edit.component';
import { SpellbookDeleteComponent } from './spellbook/spellbook-delete/spellbook-delete.component';
import { CharacterSheetComponent } from './character-sheet/character-sheet.component';

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
        SpellbookListComponent,
        SpellbookEditComponent,
        SpellbookDeleteComponent,
        CharacterSheetComponent
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
        SpellDetailDialogComponent,
        SpellbookEditComponent,
        SpellbookDeleteComponent
    ],
    imports: [
        BrowserModule,
        FlexLayoutModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule.forRoot(),
        routing
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

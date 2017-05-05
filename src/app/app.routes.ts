import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SpellsComponent } from './spells/spells.component';
import { SpellbookComponent } from './spellbook/spellbook.component';
import { SpellbookListComponent } from './spellbook/spellbook-list/spellbook-list.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'spells', component: SpellsComponent },
  {
    path: 'spellbooks',
    component: SpellbookComponent,
    children: [
      {
        path: 'list',
        component: SpellbookListComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SpellsComponent } from './spells/spells.component';
import { CharacterSheetComponent } from './character-sheet/character-sheet.component';
import { SpellbookComponent } from './spellbook/spellbook.component';
import { SpellbookListComponent } from './spellbook/spellbook-list/spellbook-list.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'spells', pathMatch: 'full' },
  { path: 'spells', component: SpellsComponent },
  { path: 'spells/:id', component: SpellsComponent },
  { path: 'character/:id', component: CharacterSheetComponent },
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';

const routes: Routes = [
  { path: 'suggestions', component: ListSuggestionComponent },
  { path: 'suggestions/:id', component: SuggestionDetailsComponent },
  { path: '', redirectTo: 'suggestions', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuggestionsRoutingModule {}

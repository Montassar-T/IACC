import { Component, OnInit, inject } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css',
})
export class ListSuggestionComponent implements OnInit {
  private suggestionService = inject(SuggestionService);

  favoriteSuggestionIds = new Set<number>();

  suggestions: Suggestion[] = [];

  searchText = '';

  ngOnInit(): void {
    this.suggestions = this.suggestionService.getSuggestionsList();
  }

  // 🔍 SEARCH
  get filteredSuggestions(): Suggestion[] {
    const term = this.searchText.trim().toLowerCase();

    if (!term) return this.suggestions;

    return this.suggestions.filter((s) =>
      [s.title, s.description, s.category].some((value) => value.toLowerCase().includes(term))
    );
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'acceptee':
        return 'status-accepted';
      case 'refusee':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'acceptee':
        return 'Acceptée';
      case 'refusee':
        return 'Refusée';
      default:
        return 'En attente';
    }
  }

  likeSuggestion(suggestion: Suggestion): void {
    if (suggestion.status === 'refusee') return;

    suggestion.nbLikes += 1;
  }

  toggleFavorite(suggestion: Suggestion): void {
    if (this.favoriteSuggestionIds.has(suggestion.id)) {
      this.favoriteSuggestionIds.delete(suggestion.id);
    } else {
      this.favoriteSuggestionIds.add(suggestion.id);
    }
  }

  isFavorite(suggestion: Suggestion): boolean {
    return this.favoriteSuggestionIds.has(suggestion.id);
  }

  deleteSuggestion(id: number): void {
    this.suggestionService.deleteSuggestion(id);

    this.suggestions = this.suggestionService.getSuggestionsList();
  }
}

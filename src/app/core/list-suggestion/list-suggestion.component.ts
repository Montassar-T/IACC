import { Component } from '@angular/core';
import { Suggestion } from '../../models/suggestion';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css',
})
export class ListSuggestionComponent {
  favoriteSuggestionIds = new Set<number>();

  suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description:
        "Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l'équipe.",
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      nbLikes: 10,
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description:
        'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 0,
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description:
        "Mise en place d'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.",
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      nbLikes: 0,
    },
    {
      id: 4,
      title: "Moderniser l'interface utilisateur",
      description:
        "Refonte complète de l'interface utilisateur pour une meilleure expérience utilisateur.",
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 0,
    },
  ];

  searchText = '';

  get filteredSuggestions(): Suggestion[] {
    const term = this.searchText.trim().toLowerCase();

    if (!term) {
      return this.suggestions;
    }

    return this.suggestions.filter((suggestion) =>
      [suggestion.title, suggestion.description, suggestion.category].some((value) =>
        value.toLowerCase().includes(term)
      )
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
    if (suggestion.status === 'refusee') {
      return;
    }

    suggestion.nbLikes += 1;
  }

  toggleFavorite(suggestion: Suggestion): void {
    if (this.favoriteSuggestionIds.has(suggestion.id)) {
      this.favoriteSuggestionIds.delete(suggestion.id);
      return;
    }

    this.favoriteSuggestionIds.add(suggestion.id);
  }

  isFavorite(suggestion: Suggestion): boolean {
    return this.favoriteSuggestionIds.has(suggestion.id);
  }
}

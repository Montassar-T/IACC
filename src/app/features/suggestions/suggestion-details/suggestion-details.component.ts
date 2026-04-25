import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css',
})
export class SuggestionDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private suggestionService = inject(SuggestionService);

  id!: number;
  suggestion?: Suggestion;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.suggestion = this.suggestionService.getSuggestionsList().find((s) => s.id === this.id);
  }

  goBack(): void {
    this.router.navigate(['/suggestions']);
  }

  goToUpdate(): void {
    this.router.navigate(['/suggestions/edit', this.id]);
  }

  delete(): void {
    this.suggestionService.deleteSuggestion(this.id);

    this.router.navigate(['/suggestions']);
  }
}

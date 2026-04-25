import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuggestionService } from '../../../core/Services/suggestion.service';
@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css',
})
export class SuggestionFormComponent implements OnInit {
  private suggestionService = inject(SuggestionService);

  suggestionForm!: FormGroup;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre',
  ];

  private fb = inject(FormBuilder);
  private router = inject(Router);

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Z][a-zA-Z]*$')],
      ],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [{ value: this.formatDate(new Date()), disabled: true }],
      status: [{ value: 'en attente', disabled: true }],
    });
  }

  onSubmit() {
    if (this.suggestionForm.valid) {
      const newSuggestion = {
        ...this.suggestionForm.getRawValue(),
        id: Date.now(),
        nbLikes: 0,
      };

      console.log(newSuggestion);

      this.suggestionService.addSuggestion(newSuggestion);

      this.router.navigate(['/listSuggestion/suggestions']);
    }
  }
}

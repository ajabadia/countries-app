import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-continent-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" class="space-y-4">
      <div>
        <label for="defaultname" class="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          id="defaultname"
          type="text"
          formControlName="defaultname"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </form>
  `,
})
export class ContinentFormComponent {
  @Input() form!: FormGroup;
}
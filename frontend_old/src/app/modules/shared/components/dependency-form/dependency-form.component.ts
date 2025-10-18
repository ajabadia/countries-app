import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dependency-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" class="space-y-4">
      <div>
        <label for="parent_id" class="block text-sm font-medium text-gray-700">ID Padre</label>
        <input
          id="parent_id"
          type="text"
          formControlName="parent_id"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label for="dependent_id" class="block text-sm font-medium text-gray-700">ID Dependiente</label>
        <input
          id="dependent_id"
          type="text"
          formControlName="dependent_id"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </form>
  `,
})
export class DependencyFormComponent {
  @Input() form!: FormGroup;
}
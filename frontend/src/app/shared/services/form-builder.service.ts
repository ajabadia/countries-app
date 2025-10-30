// File: d:\desarrollos\countries2\frontend\src\app\shared\services\form-builder.service.ts | New File

import { Injectable } from '@angular/core';
import { Validators, ValidatorFn } from '@angular/forms';
import { FIELD_DEFINITIONS } from '@app/core/config/field-definitions.config';
import { FieldMetadata } from '@app/types/field-metadata.types';
import { FormField } from '@shared/types/form.types';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  /**
   * Construye un array de configuración de FormField para una entidad específica.
   * @param entityName El nombre de la entidad (ej. 'countries', 'users').
   * @returns Un array de FormField listo para ser usado por UiDynamicFormComponent.
   */
  public buildFormFields(entityName: keyof typeof FIELD_DEFINITIONS): FormField[] {
    const entityDefinitions = FIELD_DEFINITIONS[entityName];
    if (!entityDefinitions) {
      throw new Error(`No se encontraron definiciones de campos para la entidad: ${entityName}`);
    }

    return Object.keys(entityDefinitions).map(fieldName => {
      const metadata: FieldMetadata = entityDefinitions[fieldName];
      const validators: ValidatorFn[] = [];

      if (metadata.required) {
        validators.push(Validators.required);
      }
      if (metadata.minLength) {
        validators.push(Validators.minLength(metadata.minLength));
      }
      if (metadata.maxLength) {
        validators.push(Validators.maxLength(metadata.maxLength));
      }
      if (metadata.pattern) {
        validators.push(Validators.pattern(metadata.pattern));
      }
      if (metadata.type === 'email' && !validators.some(v => v === Validators.email)) {
        validators.push(Validators.email);
      }
      if (metadata.customValidators) {
        validators.push(...metadata.customValidators);
      }

      const formField: FormField = {
        name: fieldName,
        label: metadata.label,
        type: metadata.type,
        isPrimaryKey: metadata.isPrimaryKey,
        validators: validators,
        helpText: metadata.helpText,
        maxLength: metadata.maxLength,
        characterCasing: metadata.characterCasing,
      };

      return formField;
    });
  }
}
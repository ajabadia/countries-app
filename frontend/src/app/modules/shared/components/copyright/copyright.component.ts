import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-copyright',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyrightComponent {
  /**
   * Texto personalizado para el copyright. Si no se proporciona,
   * se usará un texto por defecto.
   */
  @Input() text?: string;

  public readonly currentYear = new Date().getFullYear();

  get copyrightText(): string {
    return this.text ?? `© ${this.currentYear} CountriesApp. Todos los derechos reservados.`;
  }
}
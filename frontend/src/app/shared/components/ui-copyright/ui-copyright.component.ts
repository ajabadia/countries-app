import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-copyright',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-copyright.component.html',
  styleUrls: ['./ui-copyright.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCopyrightComponent {
  @Input() companyName = 'CountriesApp';
  @Input() startYear?: number;

  private readonly currentYear = new Date().getFullYear();

  get copyrightText(): string {
    const yearText = this.getYearText();
    return `© ${yearText} ${this.companyName}. Todos los derechos reservados.`;
  }

  private getYearText(): string {
    if (this.startYear && this.startYear < this.currentYear) {
      return `${this.startYear} - ${this.currentYear}`;
    }
    return this.currentYear.toString();
  }
}
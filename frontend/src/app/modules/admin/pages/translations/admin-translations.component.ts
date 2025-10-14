import { Component } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@Component({
  selector: 'app-translations-areas',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './admin-translations.component.html',
  styleUrls: ['./admin-translations.component.scss']
})
export class AdminTranslationsComponent {}
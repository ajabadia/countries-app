import { Component } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@Component({
  selector: 'app-languages-areas',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './admin-languages.component.html',
  styleUrls: ['./admin-languages.component.scss']
})
export class AdminLanguagesComponent {}
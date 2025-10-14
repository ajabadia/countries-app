import { Component } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@Component({
  selector: 'app-admin-acontinentsreas',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './admin-continents.component.html',
  styleUrls: ['./admin-continents.component.scss']
})
export class AdminContinentsComponent {}
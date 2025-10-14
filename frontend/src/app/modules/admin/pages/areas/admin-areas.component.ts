import { Component } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@Component({
  selector: 'app-admin-areas',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './admin-areas.component.html',
  styleUrls: ['./admin-areas.component.scss']
})
export class AdminAreasComponent {}
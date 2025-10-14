import { Component } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@Component({
  selector: 'app-dependencies-areas',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './admin-dependencies.component.html',
  styleUrls: ['./admin-dependencies.component.scss']
})
export class AdminDependenciesComponent {}
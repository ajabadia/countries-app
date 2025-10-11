import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconComponent } from '../components/ui-icon/ui-icon.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [UiIconComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [UiIconComponent],
})
export class UiIconModule { }


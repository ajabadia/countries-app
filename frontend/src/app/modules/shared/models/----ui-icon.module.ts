import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconComponent } from '../components/ui-icon/ui-icon.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ declarations: [UiIconComponent],
    exports: [UiIconComponent], imports: [CommonModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class UiIconModule { }


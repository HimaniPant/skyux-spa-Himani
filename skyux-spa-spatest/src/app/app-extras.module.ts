import {
  NgModule
} from '@angular/core';
import {
  AgGridModule
} from 'ag-grid-angular';
import {
  AppSkyModule
} from './app-sky.module';

@NgModule({
  imports: [AgGridModule.withComponents([])],
  exports: [
    AppSkyModule,
    AgGridModule
  ]
})
export class AppExtrasModule { }

import {
  NgModule
} from '@angular/core';
import {
  SkyAgGridModule
} from '@skyux/ag-grid';
import {
  SkyAvatarModule
} from '@skyux/avatar';
import {
  SkyDataManagerModule
} from '@skyux/data-manager';
import {
  SkyDatepickerModule
} from '@skyux/datetime';
import { SkyCheckboxModule, SkyInputBoxModule } from '@skyux/forms';
import {
  SkyAlertModule, SkyIconModule, SkyKeyInfoModule
} from '@skyux/indicators';
import {
  SkyInlineFormModule
} from '@skyux/inline-form';
import { SkyCardModule, SkyFluidGridModule, SkyToolbarModule } from '@skyux/layout';
import {
  SkyRepeaterModule
} from '@skyux/lists';
import {
  SkySearchModule
} from '@skyux/lookup';
import {
  SkyNavbarModule
} from '@skyux/navbar';
import {
  SkyDropdownModule
} from '@skyux/popovers';
import {
  SkyThemeModule,
  SkyThemeService
} from '@skyux/theme';
import {
  SkyEmailValidationModule
} from '@skyux/validation';
import {
  AgGridModule
} from 'ag-grid-angular';
import {
  UserDataService
} from './shared/userDetail/user.data.service';

@NgModule({
  exports: [
    SkyAvatarModule,
    SkyAlertModule,
    SkyKeyInfoModule,
    SkyFluidGridModule,
    SkyNavbarModule,
    SkyInputBoxModule,
    SkyThemeModule,
    SkyInlineFormModule,
    SkyAgGridModule,
    SkyDropdownModule,
    SkyCardModule,
    SkyToolbarModule,
    SkyDataManagerModule,
    SkyRepeaterModule,
    SkyCheckboxModule,
    SkySearchModule,
    AgGridModule,
    SkyIconModule,
    SkyEmailValidationModule,
    SkyDatepickerModule
  ],
  providers: [
    SkyThemeService,
    UserDataService
  ]
})
export class AppSkyModule { }

import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html'
})
export class AppNavComponent {
  public nav = [
    {
      titleKey: 'app_nav_userform',
      path: '/userdetail'
    },
    {
      titleKey: 'app_nav_usergrid',
      path: '/userdatagrid'
    }
  ];
}

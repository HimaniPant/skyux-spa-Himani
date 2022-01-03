import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.data.model';
import { SKY_AG_GRID_DEMO_DATA } from '../userDetail/user-data-entry-grid-demo-data';

@Injectable()
export class UserDataService {
  constructor() {}

  public getUserGridData(): Observable<User[]> {
    return of(SKY_AG_GRID_DEMO_DATA);
  }

  public saveUserDetails(userDetails: User): Observable<User[]> {
    SKY_AG_GRID_DEMO_DATA.push(userDetails);
    return of(SKY_AG_GRID_DEMO_DATA);
  }
}

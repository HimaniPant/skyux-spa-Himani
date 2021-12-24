import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SKY_AG_GRID_DEMO_DATA } from './user-data-entry-grid-demo-data';
import { User } from './user.data.model';

@Injectable()
export class UserDataService {

   constructor() {}

    public getJSON(): Observable<any> {
        return of(SKY_AG_GRID_DEMO_DATA);
    }

    public save(userDetails: User): Observable<any> {

        SKY_AG_GRID_DEMO_DATA.push(userDetails);
        return of(SKY_AG_GRID_DEMO_DATA);
    }
}

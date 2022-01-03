import { TestBed } from '@angular/core/testing';
import { User } from '../models/user.data.model';
import { UserDataService } from './user.data.service';

describe('UserDataService', () => {
  let service: UserDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataService]
    });
    service = TestBed.inject(UserDataService);
  });

  it('be able to retrive json data', () => {
    service.getUserGridData().subscribe((users) => {
      expect(users.length).toBe(7);
    });
  });

  it('be able to retrive save data', () => {
    let user: User = {
      firstName: 'Billy',
      lastName: 'Bob',
      contactNumber: '2234566',
      email: 'test@mail.com',
      dob: new Date(2000, 7, 7),
      address: 'Test Address'
    };
    service.saveUserDetails(user).subscribe((users) => {
      expect(users.length).toBe(8);
      expect(users).toContain(user);
    });
  });
});

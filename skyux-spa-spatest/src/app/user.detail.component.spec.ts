import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  SkyAppTestModule
} from '@skyux-sdk/builder/runtime/testing/browser';
import {
  expect
} from '@skyux-sdk/testing';
import { SkyAgGridService, SkyCellType } from '@skyux/ag-grid';
import { SkyValidators } from '@skyux/validation';
import { AgGridModule } from 'ag-grid-angular';
import { GridApi } from 'ag-grid-community';
import { UserDataService } from './shared/userDetail/user.data.service';
import {
  UserDetailComponent
} from './user.detail.component';
describe('User detail component', () => {

  /**
   * This configureTestingModule function imports SkyAppTestModule, which brings in all of
   * the SKY UX modules and components in your application for testing convenience. If this has
   * an adverse effect on your test performance, you can individually bring in each of your app
   * components and the SKY UX modules that those components rely upon.
   */
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule, ReactiveFormsModule, FormsModule, AgGridModule.withComponents()],
      providers: [SkyAgGridService, SkyValidators, GridApi, UserDataService]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    component.columnDefs = [
      {
        field: 'firstName',
        headerName: 'First Name'
      },
      {
        field: 'lastName',
        headerName: 'Last Name'
      },
      {
        field: 'contactNumber',
        headerName: 'Contact Number'
      },
      {
        field: 'email',
        headerName: 'Email',
        type: SkyCellType.Text
      },
      {
        field: 'dob',
        headerName: 'DOB',
        type: SkyCellType.Date
     },
     {
        field: 'address',
        headerName: 'Address'
     }
    ];
    component.gridData = [
      {
        firstName: 'Billy',
        lastName: 'Bob',
        contactNumber: '2234566',
        email: 'test@mail.com',
        dob: new Date(2000, 7, 7),
        address: 'Test Address'
      },
      {
        firstName: 'Jane',
        lastName: 'Deere',
        contactNumber: '2234566',
        email: 'test@mail.com',
        dob: new Date(2000, 7, 7),
        address: 'Test Address'
      }
    ];
    component.ngOnInit();
  });

  // it('should do something', () => {
  //   const fixture = TestBed.createComponent(UserDetailComponent);

  //   fixture.detectChanges();

  //   expect(true).toBe(false);
  // });

  it('form invalid when empty', () => {
      expect(component.userForm.valid).toBeFalsy();
  });

  it('first name field validity', () => {
    let firstName = component.userForm.controls['firstName'];
    expect(firstName.valid).toBeFalsy();
    expect(firstName.errors['required']).toBeTruthy();

    firstName.setValue('First Name');
    expect(firstName.valid).toBeTruthy();
  });

  it('last name field validity', () => {
    let lastName = component.userForm.controls['lastName'];
    expect(lastName.valid).toBeFalsy();
    expect(lastName.errors['required']).toBeTruthy();

    lastName.setValue('First Name');
    expect(lastName.valid).toBeTruthy();
  });

  it('contact number field validity', () => {
    let contactNumber = component.userForm.controls['contactNumber'];
    expect(contactNumber.valid).toBeFalsy();
    expect(contactNumber.errors['required']).toBeTruthy();

    contactNumber.setValue('7866455556666');
    expect(contactNumber.valid).toBeTruthy();

    contactNumber.setValue('223444444');
    expect(contactNumber.valid).toBeFalsy();
    expect(contactNumber.errors['required']).toBeFalsy();
    expect(contactNumber.errors['pattern']).toBeTruthy();
  });

  it('email field validity', () => {
    let email = component.userForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.errors['required']).toBeTruthy();

    email.setValue('test@mail.com');
    expect(email.valid).toBeTruthy();

    email.setValue('test.com');
    expect(email.valid).toBeFalsy();
    expect(email.errors['required']).toBeFalsy();
    expect(email.errors['skyEmail']).toBeTruthy();
  });

  it('dob field validity', () => {
    let dob = component.userForm.controls['dob'];
    expect(dob.valid).toBeFalsy();
    expect(dob.errors['required']).toBeTruthy();

    dob.setValue(new Date(2022, 7, 7));
    expect(dob.valid).toBeTruthy();
  });

  it('form valid when required fields provided', () => {
    let firstName = component.userForm.controls['firstName'];
    let lastName = component.userForm.controls['lastName'];
    let contactNumber = component.userForm.controls['contactNumber'];
    let email = component.userForm.controls['email'];
    let dob = component.userForm.controls['dob'];
    let address = component.userForm.controls['address'];

    firstName.setValue('First Name');
    lastName.setValue('Last Name');
    contactNumber.setValue('789999997777');
    email.setValue('test@mail.com');
    dob.setValue(new Date(2000, 7, 7));
    address.setValue('Test Address');
    expect(component.userForm.valid).toBeTruthy();
});

it('form visible on Add User button click', () => {
  expect(fixture.debugElement.query(By.css('form'))).toBeNull();
  component.onInlineFormOpen();
  fixture.detectChanges();
  expect(fixture.debugElement.query(By.css('form'))).toBeDefined();
});

it('grid API is not available until  `detectChanges`', () => {
  expect(component.gridOptions.api).not.toBeTruthy();
});

it('grid API is available after `detectChanges`', () => {

  fixture.whenStable().then(() => {
  expect(component.gridApi).toBeDefined();
  });
});

it('should do things onGridReady() is supposed to do', () => {

  const expectedRowData = [
    {
      firstName: 'Billy',
      lastName: 'Bob',
      contactNumber: '2234566',
      email: 'test@mail.com',
      dob: new Date(2000, 7, 7),
      address: 'Test Address'
    },
    {
      firstName: 'Jane',
      lastName: 'Deere',
      contactNumber: '2234566',
      email: 'test@mail.com',
      dob: new Date(2000, 7, 7),
      address: 'Test Address'
    }];

  fixture.detectChanges();
  fixture.whenStable().then(() => {
      console.log(' ==> stable!');
      expect(component.gridOptions.rowData).toEqual(expectedRowData);
  });
});

it('grid updated on submit button click', async() => {

  const expectedRowData = [
    {
      firstName: 'Billy',
      lastName: 'Bob',
      contactNumber: '2234566',
      email: 'test@mail.com',
      dob: new Date(2000, 7, 7),
      address: 'Test Address'
    },
    {
      firstName: 'Jane',
      lastName: 'Deere',
      contactNumber: '2234566',
      email: 'test@mail.com',
      dob: new Date(2000, 7, 7),
      address: 'Test Address'
    },
    {
    firstName: 'First Name',
      lastName: 'Last Name',
      contactNumber: '789999997777',
      email: 'test@mail.com',
      dob: new Date(2000, 7, 7),
      address: 'Test Address'}
  ];

  let firstName = component.userForm.controls['firstName'];
  let lastName = component.userForm.controls['lastName'];
  let contactNumber = component.userForm.controls['contactNumber'];
  let email = component.userForm.controls['email'];
  let dob = component.userForm.controls['dob'];
  let address = component.userForm.controls['address'];

  firstName.setValue('First Name');
  lastName.setValue('Last Name');
  contactNumber.setValue('789999997777');
  email.setValue('test@mail.com');
  dob.setValue(new Date(2000, 7, 7));
  address.setValue('Test Address');
  setTimeout(() => {
    component.onSubmit();
  fixture.detectChanges();

  fixture.whenStable().then(() => {
      expect(component.gridOptions.rowData).toEqual(expectedRowData);
  });
  }, 1000);

});

it('grid updated on search filter value', async () => {

  const expectedRowData = [
    {
      firstName: 'Billy',
      lastName: 'Bob',
      contactNumber: '2234566',
      email: 'test@mail.com',
      dob: new Date(2000, 7, 7),
      address: 'Test Address'
    }
  ];

  setTimeout(() => {
    component.searchApplied('Billy');
  fixture.detectChanges();

  fixture.whenStable().then(() => {
      expect(component.gridOptions.rowData).toEqual(expectedRowData);
  });
  }, 1000);

});

});

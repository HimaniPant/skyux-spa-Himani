import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SkyAppTestModule } from '@skyux-sdk/builder/runtime/testing/browser';
import { expect } from '@skyux-sdk/testing';
import { SkyAgGridService } from '@skyux/ag-grid';
import { SkyValidators } from '@skyux/validation';
import { AgGridModule } from 'ag-grid-angular';
import { GridApi } from 'ag-grid-community';
import { UserDataService } from '../shared/data services/user.data.service';
import { UserDetailComponent } from './user.detail.component';
describe('User detail component', () => {
  /**
   * This configureTestingModule function imports SkyAppTestModule, which brings in all of
   * the SKY UX modules and components in your application for testing convenience. If this has
   * an adverse effect on your test performance, you can individually bring in each of your app
   * components and the SKY UX modules that those components rely upon.
   */
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAppTestModule,
        ReactiveFormsModule,
        FormsModule,
        AgGridModule.withComponents()
      ],
      providers: [SkyAgGridService, SkyValidators, GridApi, UserDataService]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    router = TestBed.inject(Router);
    fixture.detectChanges();
    component = fixture.componentInstance;
    component.ngOnInit();
  });

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
    expect(contactNumber.errors?.required).toBeTruthy();
    contactNumber.setValue('(201) 766-7688');
    expect(contactNumber.valid).toBeTruthy();
    expect(contactNumber.errors?.required).toBeFalsy();
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

  it('submit button enabled when form valid', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('#submit').disabled
    ).toBeTruthy();

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
    fixture.detectChanges();
    expect(component.userForm.valid).toBeTruthy();

    expect(
      fixture.debugElement.nativeElement.querySelector('#submit').disabled
    ).toBe(false);
  });

  it('user details gets submitted on submit button click', () => {
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
    component.onSubmit();
  });

  it('should navigate to user list', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.openUserList();
    expect(navigateSpy).toHaveBeenCalledWith(['/userdatagrid']);
  });
});

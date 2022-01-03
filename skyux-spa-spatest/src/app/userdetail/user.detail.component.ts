import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { SkyTheme, SkyThemeMode, SkyThemeSettings } from '@skyux/theme';
import { SkyToastService, SkyToastType } from '@skyux/toast';
import { SkyValidators } from '@skyux/validation';
import { UserDataService } from '../shared/data services/user.data.service';
import { User } from '../shared/models/user.data.model';
@Component({
  selector: 'user-detail',
  templateUrl: './user.detail.component.html',
  styleUrls: ['./user.detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  public modernLightTheme = new SkyThemeSettings(
    SkyTheme.presets.modern,
    SkyThemeMode.presets.light
  );
  public userInfo: User;
  public userForm: FormGroup;
  public minDate = new Date(1900, 1, 1);
  public maxDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private dataService: UserDataService,
    private router: Router,
    private toastService: SkyToastService
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  public get emailControl(): AbstractControl {
    return this.userForm.get('email');
  }

  public get contactNumberControl(): AbstractControl {
    return this.userForm.get('contactNumber');
  }

  public onSubmit(): void {
    this.userInfo = {
      firstName: this.userForm.get('firstName').value,
      lastName: this.userForm.get('lastName').value,
      contactNumber: this.userForm.get('contactNumber').value,
      email: this.userForm.get('email').value,
      dob: this.userForm.get('dob').value,
      address: this.userForm.get('address').value
    };

    this.dataService.saveUserDetails(this.userInfo).subscribe((result) => {
      this.toastService.openMessage('User details saved successfully.', {
        type: SkyToastType.Success
      });
      this.userForm.reset();
    });
  }

  public openUserList(): void {
    this.router.navigate(['/userdatagrid']);
  }

  private initializeForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: new FormControl(undefined, [Validators.required]),
      lastName: new FormControl(undefined, [Validators.required]),
      contactNumber: new FormControl(undefined, [Validators.required]),
      email: new FormControl(undefined, [
        Validators.required,
        SkyValidators.email
      ]),
      dob: new FormControl(undefined, [Validators.required]),
      address: new FormControl()
    });
  }
}

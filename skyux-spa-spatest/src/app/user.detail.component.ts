import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SkyAgGridService, SkyCellType } from '@skyux/ag-grid';
import { SkyTheme, SkyThemeMode, SkyThemeSettings } from '@skyux/theme';
import { SkyValidators } from '@skyux/validation';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { SKY_AG_GRID_DEMO_DATA } from './shared/userDetail/user-data-entry-grid-demo-data';
import { User } from './shared/userDetail/user.data.model';
import { UserDataService } from './shared/userDetail/user.data.service';

@Component({
  selector: 'user-detail',
  templateUrl: './user.detail.component.html',
  styleUrls: ['./user.detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public get emailControl(): AbstractControl {
    return this.userForm.get('email');
  }

  public get contactNumberControl(): AbstractControl {
    return this.userForm.get('contactNumber');
  }

  public modernLightTheme = new SkyThemeSettings(
    SkyTheme.presets.modern,
    SkyThemeMode.presets.light
  );
  public userInfo: User;
  public userForm: FormGroup;
  public showForm: boolean = false;
  public minDate = new Date(1900, 1, 1);
  public maxDate = new Date();
  public gridData = SKY_AG_GRID_DEMO_DATA;
  public columnDefs = [
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

  public gridApi: GridApi;
  public gridOptions: GridOptions;
  public searchText: string;
  constructor(
    private agGridService: SkyAgGridService,
    private formBuilder: FormBuilder,
    private dataService: UserDataService) {
  }

  public ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: new FormControl(undefined, [Validators.required]),
      lastName: new FormControl(undefined, [Validators.required]),
      contactNumber: new FormControl(undefined, [Validators.required, Validators.pattern(/(7|8|9)\d{9}/)]),
      email: new FormControl(undefined, [Validators.required, SkyValidators.email]),
      dob: new FormControl(undefined, [Validators.required]),
      address: new FormControl()
    });
    this.gridOptions = {
      columnDefs: this.columnDefs,
      onGridReady: gridReadyEvent => this.onGridReady(gridReadyEvent)
    };
    this.gridOptions = this.agGridService.getGridOptions({ gridOptions: this.gridOptions });
  }

  public onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.gridApi = gridReadyEvent.api;

    this.gridApi.sizeColumnsToFit();
  }

  public searchApplied(searchText: string): void {
    this.searchText = searchText;
    this.gridApi.setQuickFilter(searchText);
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
     console.log(this.userInfo);
     this.dataService.save(this.userInfo).subscribe( result => {
       this.gridData = result;
       console.log(this.gridData);
       this.gridApi.setRowData(this.gridData);
       this.userForm.reset();
       this.showForm = false;
     });
    }

  public onInlineFormOpen(): void {
    this.showForm = true;
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SkyAppTestModule } from '@skyux-sdk/builder/runtime/testing/browser';
import { expect } from '@skyux-sdk/testing';
import { SkyAgGridModule, SkyCellType } from '@skyux/ag-grid';
import { SkyValidators } from '@skyux/validation';
import { AgGridModule } from 'ag-grid-angular';
import { GridApi } from 'ag-grid-community';
import { UserDataService } from '../shared/data services/user.data.service';
import { UserDataGridComponent } from './userdatagrid.component';

describe('Userdatagrid component', () => {
  /**
   * This configureTestingModule function imports SkyAppTestModule, which brings in all of
   * the SKY UX modules and components in your application for testing convenience. If this has
   * an adverse effect on your test performance, you can individually bring in each of your app
   * components and the SKY UX modules that those components rely upon.
   */

  let component: UserDataGridComponent;
  let fixture: ComponentFixture<UserDataGridComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule, AgGridModule.withComponents()],
      providers: [SkyAgGridModule, SkyValidators, GridApi, UserDataService]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDataGridComponent);
    router = TestBed.inject(Router);
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
    component.ngOnInit();
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
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.gridOptions.rowData.length).toEqual(7);
    });
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

  it('should navigate to user details form', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.openUserForm();
    expect(navigateSpy).toHaveBeenCalledWith(['/userdetail']);
  });
});

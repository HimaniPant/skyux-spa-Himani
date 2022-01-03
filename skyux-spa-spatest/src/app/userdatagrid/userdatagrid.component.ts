import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SkyAgGridService, SkyCellType } from '@skyux/ag-grid';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { UserDataService } from '../shared/data services/user.data.service';
import { User } from '../shared/models/user.data.model';

@Component({
  selector: 'app-userdatagrid',
  templateUrl: './userdatagrid.component.html',
  styleUrls: ['./userdatagrid.component.scss']
})
export class UserDataGridComponent implements OnInit {
  public gridData: User[] = [];
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
    private router: Router,
    private userDataService: UserDataService
  ) {}

  public ngOnInit(): void {
    this.initializeGirdOptions();
  }

  public onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.gridApi = gridReadyEvent.api;

    this.gridApi.sizeColumnsToFit();
  }

  public searchApplied(searchText: string): void {
    this.searchText = searchText;
    this.gridApi.setQuickFilter(searchText);
  }

  public openUserForm(): void {
    this.router.navigate(['/userdetail']);
  }

  private initializeGirdOptions(): void {
    this.getUserGridData();
    this.gridOptions = {
      columnDefs: this.columnDefs,
      onGridReady: (gridReadyEvent) => this.onGridReady(gridReadyEvent)
    };
    this.gridOptions = this.agGridService.getGridOptions({
      gridOptions: this.gridOptions
    });
  }

  private getUserGridData(): void {
    this.userDataService.getUserGridData().subscribe((result) => {
      this.gridData = result;
    });
  }
}

import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CountryShipModel } from 'app/@core/models/country-ship';
import { CountryShipService } from 'app/@core/service/country-ship.service';
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'app/@core/service/authentication.service';
import { GuidService } from 'app/@core/service/guid.service';
import { ToastrComponent } from 'app/pages/modal-overlays/toastr/toastr.component';
import {
  NbToastrService,
  NbToastrConfig,
} from '@nebular/theme';


@Component({
  selector: 'ngx-country-ship',
  templateUrl: './country-ship.component.html',
  styleUrls: ['./country-ship.component.scss'],
})
export class CountryShipComponent {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      hmdShipToCode: {
        title: 'HMD Ship Code',
        type: 'string',
      },
      hmdShipToParty: {
        title: 'HMD Ship Party',
        type: 'string',
      },
      shipToCountryCode: {
        title: 'Country Code',
        type: 'string',
      },
      shipToCountryName: {
        title: 'Country Name',
        type: 'string',
      },
      updatedDate: {
        title: 'Updated Date',
        valuePrepareFunction: (created) => {
          return this.datePipe.transform(new Date(created), 'MM/dd/yyyy');
        },
        editable: false,
        addable: false,
      },
      remarkCountry: {
        title: 'Remark',
        type: 'string',
      },
      id: {
        title: 'Id',
        valuePrepareFunction: (created) => { return created.substring(0,8);},
        editable: false,
        addable: false,
      },
    },
  };

  source: LocalDataSource;
  alert = new ToastrComponent(this.toastrService);

  constructor(private serviceCountry: CountryShipService,
              private datePipe: DatePipe,
              private authen: AuthenticationService,
              private guidService: GuidService,
              private toastrService: NbToastrService,
              private http: HttpClient) {
    this.source = new LocalDataSource();
    this.serviceCountry.getAllCountryShip()
      .subscribe(result => {
        this.source.load(result);
      });
  }

  onCreateConfirm(event): void {
    const country = {
      "id": this.guidService.getGuid(),
      "hmdShipToCode": event.newData.hmdShipToCode,
      "hmdShipToParty": event.newData.hmdShipToParty,
      "shipToCountryCode": event.newData.shipToCountryCode,
      "shipToCountryName": event.newData.shipToCountryName,
      "updatedBy": this.authen.userName(),
      "updatedDate": new Date(),
      "remarkCountry": event.newData.remarkCountry,
    };
    console.log(country);
    this.serviceCountry.createCountryShip(country)
      .subscribe(result => {
        console.log(result);
        this.alert.showToast('success', 'Success', 'Create country ship successfully!');
        event.confirm.resolve(event.newData);
      },
        (err: HttpErrorResponse) => {
          this.alert.showToast('danger', 'Error', 'Create country ship error!');
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        },
      );
  }

  onSaveConfirm(event): void {
    const country = {
      "id": event.newData.id,
      "hmdShipToCode": event.newData.hmdShipToCode,
      "hmdShipToParty": event.newData.hmdShipToParty,
      "shipToCountryCode": event.newData.shipToCountryCode,
      "shipToCountryName": event.newData.shipToCountryName,
      "updatedBy": this.authen.userName(),
      "updatedDate": new Date(),
      "remarkCountry": event.newData.remarkCountry,
    };
    const id = event.newData.id;
    this.serviceCountry.editCountryShip(id, country)
      .subscribe(result => {
        console.log(result);
        this.alert.showToast('success', 'Success', 'Update country ship successfully!');
        event.confirm.resolve(event.newData);
      },
        (err: HttpErrorResponse) => {
          this.alert.showToast('danger', 'Error', 'Update the country ship error!');
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        },
      );
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      const id = event.data.id;
      this.serviceCountry.deleteCountryShip(id)
        .subscribe(result => {
          console.log(result);
          this.alert.showToast('success', 'Success', 'Delete the country ship successfully!');
          event.confirm.resolve();
        },
          (err: HttpErrorResponse) => {
            this.alert.showToast('danger', 'Error', 'Delete the country ship error!');
            event.confirm.reject();
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.");
            }
          },
        );
    } else {
      event.confirm.reject();
    }
  }
}

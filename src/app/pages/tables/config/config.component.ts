import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {
  source: LocalDataSource;
  alert = new ToastrComponent(this.toastrService);
  // Setting is setting table
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
      ecusRuntime: {
        title: 'Ecus Runtime',
        type: 'string',
      },
      dsruntime: {
        title: 'DN Runtime',
        type: 'string',
      },
      dstimeLastMonth: {
        title: 'Last Month',
        type: 'int',
      },
      dstimeNextMonth: {
        title: 'Next Month',
        type: 'int',
      },
      dstimeLastYear: {
        title: 'Next Year',
        type: 'int',
      },
      dstimeNextYear: {
        title: 'Last Year',
        type: 'int',
      },
      updatedDate: {
        title: 'Updated Date',
        valuePrepareFunction: (created) => {
          if (isNaN(Date.parse(created))) {
            return formatDate(new Date(), 'MM/dd/yyyy', 'en_US');
          } else
            // return this.datePipe.transform(new Date(created), 'MM/dd/yyyy');
            return formatDate(new Date(created), 'MM/dd/yyyy', 'en_US');
        },
        editor: {
          type: 'custom',
          component: CustomInputEditorComponent,
        },
      },
      remarkCountry: {
        title: 'Remark',
        type: 'string',
      },
      id: {
        title: 'Id',
        valuePrepareFunction: (created) => created.substring(0, 8),
        editable: false,
        addable: false,
      },
    },
  };

  constructor(
    private serviceConfig: ConfigService,
    private authen: AuthenticationService,
    private guidService: GuidService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService) {
    this.source = new LocalDataSource();
    this.serviceConfig.getAllConfig()
      .subscribe(result => {
        this.source.load(result);
      });
  }

  onCreateConfirm(event): void {
    const country = {
      'id': this.guidService.getGuid(),
      'ecusRuntime': event.newData.ecusRuntime,
      'dsruntime': event.newData.dsruntime,
      'dstimeLastMonth': event.newData.dstimeLastMonth,
      'dstimeNextMonth': event.newData.dstimeNextMonth,
      'dstimeLastYear': event.newData.dstimeLastYear,
      'dstimeNextYear': event.newData.dstimeNextYear,
      'updatedBy': this.authen.userName(),
      'updatedDate': new Date(),
      'remarkConfig': event.newData.remarkCountry,
    };
    console.log(country);
    this.serviceConfig.createConfig(country)
      .subscribe(result => {
        console.log(result);
        this.alert.showToast('success', 'Success', 'Create config successfully!');
        event.confirm.resolve(event.newData);
      },
        (err: HttpErrorResponse) => {
          this.alert.showToast('danger', 'Error', 'Create config error!');
          if (err.error instanceof Error) {
            console.log('Client-side error occured.');
          } else {
            console.log('Server-side error occured.');
          }
        },
      );
  }

  constructor() { }

  ngOnInit(): void {
  }

}

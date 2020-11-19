import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
      id1: {
        title: 'ID',
        type: 'number',
      },
      firstName1: {
        title: 'First Name',
        type: 'string',
      },
      lastName1: {
        title: 'Last Name',
        type: 'string',
      },
      username1: {
        title: 'Username',
        type: 'string',
      },
      email1: {
        title: 'E-mail',
        type: 'string',
      },
      age1: {
        title: 'Age',
        type: 'number',
      },
      usernam1e: {
        title: 'Username',
        type: 'string',
      },
      em2ail: {
        title: 'E-mail',
        type: 'string',
      },
      a2ge: {
        title: 'Age',
        type: 'number',
      },
      i2d1: {
        title: 'ID',
        type: 'number',
      },
      first2Name1: {
        title: 'First Name',
        type: 'string',
      },
      last2Name1: {
        title: 'Last Name',
        type: 'string',
      },
      userna2me1: {
        title: 'Username',
        type: 'string',
      },
      emai2l1: {
        title: 'E-mail',
        type: 'string',
      },
      a2ge1: {
        title: 'Age',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}

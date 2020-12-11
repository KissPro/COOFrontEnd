import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { COOExportModel } from 'app/@core/models/coo-export';
import { DNModel } from 'app/@core/models/dn';
import { COOExportService } from 'app/@core/service/coo-export.service';
import { UploadService } from 'app/@core/service/upload-file.service';

@Component({
  selector: 'ngx-coo',
  templateUrl: './coo.component.html',
  styleUrls: ['./coo.component.scss'],
})
export class COOComponent implements OnInit {
  // Receive value
  listSelectedDN: DNModel[];
  shipFrom: string;
  cooNo: string;
  packageNo: string;
  type: string;


  constructor(public windowRef: NbWindowRef,
    private uploadService: UploadService,
    private exportCOO: COOExportService,
  ) { }

  ngOnInit(): void {
  }


  listRemoveDuplicate() {
    return this.listSelectedDN.filter(
      (dn, i, arr) => arr.findIndex(x => x.delivery === dn.delivery) === i,
    );
  }

  listRemoveDuplicateHscode() {
    return this.listSelectedDN.filter(
      (dn, i, arr) => arr.findIndex(x => x.harmonizationCode === dn.harmonizationCode) === i,
    );
  }

  onSubmit() {
    // Get value - reload table
    if (this.shipFrom === undefined || this.cooNo === undefined || this.packageNo === undefined) {
      alert('Nhập input đế!');
      return;
    }
    const coo: COOExportModel = {
      dn: this.listSelectedDN,
      ship: this.shipFrom,
      cooNo: this.cooNo,
      packageNo: this.packageNo,
    };
    this.exportCOO.SaveCOO(coo)
      .subscribe(
        result => {
          console.log('save coo success!');
          this.windowRef.close();
        },
        (error: HttpErrorResponse) => { console.log('save coo error' + error); },
      );
  }

  onExport() {
    // check input required
    if (this.shipFrom === undefined || this.cooNo === undefined || this.packageNo === undefined) {
      alert('Nhập input đế!');
      return;
    }
    const coo: COOExportModel = {
      dn: this.listSelectedDN,
      ship: this.shipFrom,
      cooNo: this.cooNo,
      packageNo: this.packageNo,
    };
    this.exportCOO.ExportCOO(coo)
      .subscribe(
        result => this.uploadService.ShowFile(result, 'COO_Export_' + this.cooNo + '.xlsx'),
      );
  }
}



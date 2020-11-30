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
  // Send from caller
  selectedDN?: DNModel;
  shipFrom: string;
  cooNo: string;
  constructor(public windowRef: NbWindowRef,
              private uploadService: UploadService,
              private exportCOO: COOExportService,
    ) { }

  ngOnInit(): void {
    console.log(this.selectedDN);
  }

  onSubmit() {
    this.windowRef.close();
  }

  onExport() {
    const coo: COOExportModel = {
      dn : this.selectedDN,
      ship: this.shipFrom,
      cooNo: this.cooNo,
    };
    alert(this.shipFrom);
    this.exportCOO.ExportCOO(coo)
    .subscribe(
      result => this.uploadService.ShowFile(result, 'COO.xlsx'),
      // error => this.alert.showToast('danger', 'Error', 'Download template file error!'),
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NbSidebarService, NbWindowService } from '@nebular/theme';
import { LayoutService } from 'app/@core/utils';
import { DNModel } from 'app/@core/models/dn';
import { DNService } from 'app/@core/service/dn.service';
import { COOComponent } from 'app/pages/forms/coo/coo.component';



@Component({
  selector: 'ngx-dn',
  templateUrl: 'dn.component.html',
  styleUrls: ['dn.component.scss'],
})
export class DNComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dns: DNModel[];
  indexTable: number;
  selectedDN?: DNModel;

  constructor(private http: HttpClient,
    private dnService: DNService,
    private sidebarService: NbSidebarService,
    private windowService: NbWindowService,
    private layoutService: LayoutService) { }

  ngOnInit(): void {
    const that = this;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.toggleSidebar();
    this.dtOptions[2] = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      scrollX: true,
      scrollY: '62vh',
      order: [1, 'asc'],

      ajax: (dataTablesParameters: any, callback) => {
        that.dnService.getDN(dataTablesParameters)
          .subscribe(resp => {
            that.dns = resp.data;
            that.indexTable = resp.start;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [],
            });
          });
      },
      columns: [
        { data: 'index' }, { data: 'delivery' }, { data: 'invoiceNo' }, { data: 'materialParent' }, { data: 'materialDesc' },
        { data: 'shipToCountry' }, { data: 'partyName' }, { data: 'customerInvoiceNo' }, { data: 'saleUnit' },
        { data: 'actualGidate' }, { data: 'netValue' }, { data: 'dnqty' }, { data: 'netPrice' },
        { data: 'harmonizationCode' }, { data: 'address' }, { data: 'address' },
        { data: 'address' }, { data: 'plant' }, { data: 'planGidate' },
        { data: 'planGisysDate' }, { data: 'insertedDate' }, { data: 'updatedDate' },
      ],
      columnDefs: [
        { targets: 'no-sort', orderable: false },
      ],
    };

    // Created COO Tables
    this.dtOptions1[3] = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      scrollX: true,
      scrollY: '62vh',
      order: [2, 'asc'],

      ajax: (dataTablesParameters: any, callback) => {
        this.dnService.getDNManual(dataTablesParameters)
          .subscribe(resp => {
            this.dnsManual = resp.data;
            this.indexTable2 = resp.start;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [],
            });
          });
      },
      columns: [
        { data: 'index'},
        { data: 'deliverySales.partyName' }, { data: 'deliverySales.shipToCountry' },
        { data: 'deliverySales.delivery' }, { data: 'deliverySales.invoiceNo' }, { data: 'deliverySales.customerInvoiceNo' },
        { data: 'receiptDate' }, { data: 'coono' },
        { data: 'returnDate' }, { data: 'cooform' }, { data: 'trackingNo' },
        { data: 'trackingDate' }, { data: 'courierDate' },
        { data: 'shipFrom' }, { data: 'package' }, { data: 'remarkDs' },
      ],
      columnDefs: [
        { targets: 'no-sort', orderable: false },
      ],
    };
  }

  toggleSidebar() {
    this.sidebarService.compact('menu-sidebar');
    this.layoutService.changeLayoutSize();
  }

  // Thao tác với table
  currentRow;
  selectedRow(event, i, dn) {
    if (i !== this.currentRow) {
      this.currentRow = i;
      this.selectedDN = dn;
    } else
      this.currentRow = undefined;
  }

  openCreateCOO() {
    this.windowService.open(COOComponent,
      {
        title: `Create COO Report - DN: ` + this.selectedDN.delivery,
        context: { selectedDN: this.selectedDN },
      });
  }

  // Check box
  checkList(dn: DNModel) {
    if (!this.listSelectDN.find(x => x.delivery === dn.delivery
      && x.invoiceNo === dn.invoiceNo
      && x.materialParent === dn.materialParent)) {
      // add to list
      return false;
    } else
      return true;
  }

  checkuncheckall() {
    if (this.listSelectDN === this.dns) {
      this.listSelectDN = [];
    } else {
      this.listSelectDN = this.dns;
    }
    console.log(this.listSelectDN);
  }
}

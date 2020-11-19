import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NbSidebarService } from '@nebular/theme';
import { LayoutService } from 'app/@core/utils';
import { DNModel } from 'app/@core/models/dn';
import { DNService } from 'app/@core/service/dn.service';



@Component({
  selector: 'ngx-dn',
  templateUrl: 'dn.component.html',
  styleUrls: ['dn.component.scss'],
})
export class DNComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dns: DNModel[];

  constructor(private http: HttpClient,
    private dnService: DNService,
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService) {}

  ngOnInit(): void {
    const that = this;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.toggleSidebar();
    this.dtOptions[2] = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.dnService.getDN(dataTablesParameters)
          .subscribe(resp => {
            that.dns = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [],
            });
          });
      },
      columns: [
        { data: 'delivery' }, {data: 'invoiceNo' }, { data: 'materialParent' }, { data: 'materailDesc' },
        { data: 'shipToCountry' }, { data: 'partyName' }, { data: 'customerInvoiceNo' }, { data: 'saleUnit' },
      ],
    };
  }

  toggleSidebar() {
    this.sidebarService.compact('menu-sidebar');
    this.layoutService.changeLayoutSize();
  }
}

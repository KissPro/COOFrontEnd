import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NbSidebarService } from '@nebular/theme';
import { LayoutService } from 'app/@core/utils';
import { BoomEcusModel } from 'app/@core/models/boom-ecus';
import { BoomEcusService } from 'app/@core/service/boom-ecus.service';



@Component({
  selector: 'ngx-boom-ecus',
  templateUrl: 'boom-ecus.component.html',
  styleUrls: ['boom-ecus.component.scss'],
})
export class BoomEcusComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  boomEcus: BoomEcusModel[];

  constructor(private http: HttpClient,
    private boomEcusService: BoomEcusService,
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService) {}

  ngOnInit(): void {
    const that = this;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.toggleSidebar();
    this.dtOptions[1] = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.boomEcusService.getBoomEcus(dataTablesParameters)
          .subscribe(resp => {
            that.boomEcus = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [],
            });
          });
      },
      columns: [
        { data: 'maHS' }, {data: 'quantity' }, { data: 'donGiaHD' }, { data: 'country' },
        { data: 'soTk' }, { data: 'ngayDk' }, { data: 'altGroup' }, { data: 'sortString' },
        { data: 'parentMaterial' }, { data: 'level' }, { data: 'item' }, { data: 'plan' },
      ],
    };
  }

  toggleSidebar() {
    this.sidebarService.compact('menu-sidebar');
    this.layoutService.changeLayoutSize();
  }
}

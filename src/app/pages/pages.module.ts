import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { COOService } from 'app/@core/mock/coo.service';
import { DataTablesModule } from 'angular-datatables';
import { BoomEcusService } from 'app/@core/service/boom-ecus.service';
import { DNService } from 'app/@core/service/dn.service';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    DataTablesModule,
  ],
  declarations: [
    PagesComponent,
  ],
  providers: [COOService, BoomEcusService, DNService],
})
export class PagesModule {
}

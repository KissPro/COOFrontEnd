import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTabsetModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';
import { DataTablesModule } from 'angular-datatables';
import { COOService } from 'app/@core/mock/coo.service';
import { BoomEcusService } from 'app/@core/service/boom-ecus.service';
import { DNService } from 'app/@core/service/dn.service';
import { CountryShipService } from 'app/@core/service/country-ship.service';
import { GuidService } from 'app/@core/service/guid.service';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbTabsetModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
  ],
  providers: [COOService, BoomEcusService, DNService, CountryShipService, GuidService],
})
export class TablesModule { }

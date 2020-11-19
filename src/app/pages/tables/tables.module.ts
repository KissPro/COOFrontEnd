import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';
import { DataTablesModule } from 'angular-datatables';
import { COOService } from 'app/@core/mock/coo.service';
import { BoomEcusService } from 'app/@core/service/boom-ecus.service';
import { DNService } from 'app/@core/service/dn.service';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
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
  providers: [COOService, BoomEcusService, DNService],
})
export class TablesModule { }

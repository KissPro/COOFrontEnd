import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { DNManualModel, DNModel } from 'app/@core/models/dn';
import { DNService } from 'app/@core/service/dn.service';
import { Input } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import { DialogUploadFileComponent } from 'app/pages/modal-overlays/dialog/dialog-upload-file/dialog-upload-file.component';


@Component({
    selector: 'ngx-dnm',
    templateUrl: 'dnm.component.html',
    styles: ['.classButton { padding: 0 0 1rem 2rem; margin: 0; }'],
})
export class DNMComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    @Input() changeValue: string;
    @Input() type: string;

    // Datatable parameter
    dtOptions: DataTables.Settings = {};
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    dtTrigger: Subject<any> = new Subject();

    // Variable
    dns: DNModel[];
    indexTable: number;

    selectedDN?: DNModel;
    listSelectDN: DNModel[] = [];


    constructor(
        private dnService: DNService,
        private dialogService: NbDialogService,
    ) { }

    // When incoming table change (@Input change) - update coo table
    ngOnChanges(): void {
        if (this.changeValue !== undefined) {
            this.loadCOOTable();
            this.reloadCOOTable();
        }
    }

    ngOnInit(): void {
        this.loadCOOTable();
    }
    loadCOOTable() {
        this.dtOptions[1] = {
            pagingType: 'full_numbers',
            pageLength: 10,
            serverSide: true,
            processing: true,
            scrollX: true,
            autoWidth: true,
            scrollY: '62vh',
            order: [1, 'asc'],

            ajax: (dataTablesParameters: any, callback) => {
                this.dnService.getDNManual(dataTablesParameters, this.type)
                    .subscribe(resp => {
                        this.dns = resp.data;
                        this.indexTable = resp.start;
                        callback({
                            recordsTotal: resp.recordsTotal,
                            recordsFiltered: resp.recordsFiltered,
                            data: [],
                        });
                    });
            },
            columns: [
                { data: 'index' },
                { data: 'deliverySales.partyName' }, { data: 'deliverySales.shipToCountry' },
                { data: 'deliverySales.delivery' }, { data: 'deliverySales.invoiceNo' },
                { data: 'deliverySales.customerInvoiceNo' },
                { data: 'receiptDate' }, { data: 'coono' },
                { data: 'returnDate' }, { data: 'cooform' }, { data: 'trackingNo' },
                { data: 'trackingDate' }, { data: 'courierDate' },
                { data: 'shipFrom' }, { data: 'package' },
                { data: 'remarkDs' },
            ],
            columnDefs: [
                { targets: 'no-sort', orderable: false },
            ],
        };
    }
    reloadCOOTable() {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }
    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }

    // upload file
    uploadFile(): void {
        this.dialogService.open(DialogUploadFileComponent, {
            context: {
                type: 'COO Manual',
                fileName: 'DN_Manual_Template.xlsx',
                urlUpload: '/api/dn/import-excel',
            },
        }).onClose.subscribe(result => (result === 'success') ? this.reloadCOOTable() : null);
    }
}

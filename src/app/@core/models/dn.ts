import { Observable } from 'rxjs';
import { DataTablesResponse } from './datatables';

export interface DNModel {
    id: string;
    delivery: number;
    invoiceNo: number;
    materialParent: string;
    materialDesc: string;
    shipToCountry: string;
    partyName: string;
    customerInvoiceNo: number;
    saleUnit: string;
    actualGidate: Date;
    netValue: number;
    dnqty: number;
    netPrice: number;
    harmonizationCode?: string;
    address?: string;
    plant: string;
    planGidate: Date;
    planGisysDate: Date;
    insertedDate: Date;
    updatedDate?: Date;
    status?: number;
}

export abstract class DNData {
abstract getDN(dtParameter: any): Observable<DataTablesResponse>;
}


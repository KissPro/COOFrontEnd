import { Observable } from 'rxjs';

export interface ConfigModel {
    id: string;
    ecusRuntime: string;
    dsruntime: string;
    dstimeLastMonth: number;
    dstimeNextMonth: number;
    dstimeLastYear: number;
    dstimeNextYear: number;
    updatedBy: string;
    updatedDate: Date;
    remarkConfig?: string;
}
export abstract class ConfigData {
    abstract getAllConfig(): Observable<ConfigModel>;
}

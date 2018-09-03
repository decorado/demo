import { DecApiService } from './../../services/api/decora-api.service';
import { Observable } from 'rxjs';
export declare class CategoryPipeService {
    private decApi;
    constructor(decApi: DecApiService);
    get: (code: any) => Observable<string>;
    formatI18n(i18n: any): "en" | "pt-br";
    private getData();
}

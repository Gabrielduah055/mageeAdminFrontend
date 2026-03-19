import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environment.prod';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private apiUrl = environment.apiBaseUrl + '/admin/settings';
    private uploadUrl = environment.apiBaseUrl + '/upload';

    constructor(private http: HttpClient) { }

    getSettings(): Observable<any> {
        return this.http.get<any>(this.apiUrl).pipe(
            map((res) => res.settings ?? res)
        );
    }

    updateSettings(data: any): Observable<any> {
        return this.http.put<any>(this.apiUrl, data).pipe(
            map((res) => res.settings ?? res)
        );
    }

    uploadLogo(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('image', file);
        return this.http.post<any>(this.uploadUrl, formData);
    }
}

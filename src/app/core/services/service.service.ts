import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    private apiUrl = environment.apiBaseUrl + '/admin/services';

    constructor(private http: HttpClient) { }

    getServices(): Observable<any[]> {
        return this.http.get<any>(this.apiUrl).pipe(
            map((res) => res.services ?? res ?? [])
        );
    }

    createService(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, data).pipe(
            map((res) => res.service ?? res)
        );
    }

    updateService(id: string, data: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, data).pipe(
            map((res) => res.service ?? res)
        );
    }

    deleteService(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}

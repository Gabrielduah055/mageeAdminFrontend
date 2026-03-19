import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private apiUrl = environment.apiBaseUrl + '/admin/clients';

    constructor(private http: HttpClient) { }

    getClients(): Observable<any[]> {
        return this.http.get<any>(this.apiUrl).pipe(
            map((res) => res.clients ?? res ?? [])
        );
    }

    getClientById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }
}

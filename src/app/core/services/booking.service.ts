import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environment.prod';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private apiUrl = environment.apiBaseUrl + '/admin/bookings';

    constructor(private http: HttpClient) { }

    getBookings(): Observable<any[]> {
        return this.http.get<any>(this.apiUrl).pipe(
            map((res) => res.bookings ?? res ?? [])
        );
    }

    updateStatus(id: string, status: string): Observable<any> {
        return this.http.patch<any>(`${this.apiUrl}/${id}`, { status });
    }
}

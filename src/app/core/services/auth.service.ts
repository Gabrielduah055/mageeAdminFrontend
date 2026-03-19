import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environment.prod';
import { loginCredentials } from '../../interface/LoginCredentials';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private TOKEN_KEY = 'magee_admin_token';
    private USER_KEY = 'magee_admin_user';
    private authUrl = environment.apiBaseUrl + '/auth/login';

    private currentUserSubject = new BehaviorSubject<any>(this.parseUser());
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) { }

  login(credentials: loginCredentials): Observable<boolean> {
        return this.http.post<{ token: string; user: any }>(this.authUrl, credentials)
            .pipe(
                tap(res => {
                    localStorage.setItem(this.TOKEN_KEY, res.token);
                    localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
                    this.currentUserSubject.next(res.user);
                }),
                map(() => true),
                catchError(() => of(false))
            );
        }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        this.currentUserSubject.next(null);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    getUser():any | null {
        const userStr = localStorage.getItem(this.USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    }

    private parseUser(): any | null {
        const userStr = localStorage.getItem(this.USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    }
}

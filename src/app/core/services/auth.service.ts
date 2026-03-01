import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private TOKEN_KEY = 'magee_admin_token';
    private USER_KEY = 'magee_admin_user';

    login(email: string, password: string): boolean {
        // Simple hardcoded auth — replace with real API call
        if (email && password) {
            localStorage.setItem(this.TOKEN_KEY, 'demo-token-' + Date.now());
            localStorage.setItem(this.USER_KEY, JSON.stringify({ name: 'Admin', email }));
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    getUser(): { name: string; email: string } | null {
        const raw = localStorage.getItem(this.USER_KEY);
        return raw ? JSON.parse(raw) : null;
    }
}

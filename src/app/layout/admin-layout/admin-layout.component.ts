import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
    isSidebarOpen = true;
    isProfileMenuOpen = false;

    navLinks = [
        { path: '/dashboard', icon: 'uil-apps', label: 'Dashboard' },
        { path: '/bookings', icon: 'uil-calendar-alt', label: 'Bookings' },
        { path: '/clients', icon: 'uil-users-alt', label: 'Clients' },
        { path: '/services', icon: 'uil-scissors', label: 'Services' },
        { path: '/staff', icon: 'uil-user-nurse', label: 'Staff' },
        { path: '/settings', icon: 'uil-setting', label: 'Settings' },
    ];

    constructor(private authService: AuthService, private router: Router) { }

    toggleSidebar(): void {
        this.isSidebarOpen = !this.isSidebarOpen;
    }

    toggleProfileMenu(): void {
        this.isProfileMenuOpen = !this.isProfileMenuOpen;
    }

    getUser() {
        return this.authService.getUser();
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}

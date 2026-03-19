import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    stats: any[] = [
        { label: "Today's Bookings", value: '--', change: '', positive: true, icon: 'uil-calendar-alt', bg: 'bg-rose-50', text: 'text-rose-600' },
        { label: 'Total Clients', value: '--', change: '', positive: true, icon: 'uil-users-alt', bg: 'bg-amber-50', text: 'text-amber-600' },
        { label: 'Revenue (Month)', value: '--', change: '', positive: true, icon: 'uil-money-bill', bg: 'bg-emerald-50', text: 'text-emerald-600' },
        { label: 'Active Services', value: '--', change: '', positive: true, icon: 'uil-scissors', bg: 'bg-purple-50', text: 'text-purple-600' }
    ];
    recentBookings: any[] = [];
    topServices: any[] = [];
    isLoading = true;
    errorMessage = '';

    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {
        this.dashboardService.getDashboardStats().subscribe({
            next: (data) => {
                if (data) {
                    this.stats = [
                        { label: "Today's Bookings", value: data.todayBookings ?? '--', change: 'bookings today', positive: true, icon: 'uil-calendar-alt', bg: 'bg-rose-50', text: 'text-rose-600' },
                        { label: 'Total Clients', value: data.totalClients ?? '--', change: 'registered clients', positive: true, icon: 'uil-users-alt', bg: 'bg-amber-50', text: 'text-amber-600' },
                        { label: 'Revenue (Month)', value: data.monthRevenue ?? '--', change: 'this month', positive: true, icon: 'uil-money-bill', bg: 'bg-emerald-50', text: 'text-emerald-600' },
                        { label: 'Active Services', value: data.activeServices ?? '--', change: 'services available', positive: true, icon: 'uil-scissors', bg: 'bg-purple-50', text: 'text-purple-600' }
                    ];
                    this.recentBookings = (data.recentBookings ?? []).map((b: any) => ({
                        client: b.client ?? b.user?.name ?? 'Unknown',
                        service: b.service ?? b.service?.name ?? 'Unknown',
                        time: b.time ?? b.booking_time ?? '',
                        date: b.date ?? b.booking_date ?? '',
                        status: this.capitalizeFirst(b.status ?? 'pending'),
                    }));
                    this.topServices = data.topServices ?? [];
                }
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error fetching dashboard data', err);
                this.errorMessage = 'Failed to load dashboard data.';
                this.isLoading = false;
            }
        });
    }

    capitalizeFirst(s: string): string {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'Confirmed': return 'bg-blue-50 text-blue-600';
            case 'Completed': return 'bg-emerald-50 text-emerald-600';
            case 'Pending': return 'bg-amber-50 text-amber-600';
            case 'Cancelled': return 'bg-red-50 text-red-500';
            default: return 'bg-gray-100 text-gray-500';
        }
    }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    stats = [
        {
            label: "Today's Appointments",
            value: '12',
            change: '+3 from yesterday',
            positive: true,
            icon: 'uil-calendar-alt',
            color: 'rose',
            bg: 'bg-rose-50',
            text: 'text-rose-600'
        },
        {
            label: 'Total Clients',
            value: '348',
            change: '+12 this month',
            positive: true,
            icon: 'uil-users-alt',
            color: 'amber',
            bg: 'bg-amber-50',
            text: 'text-amber-600'
        },
        {
            label: 'Revenue (Month)',
            value: 'GH₵ 4,280',
            change: '+8% from last month',
            positive: true,
            icon: 'uil-money-bill',
            color: 'emerald',
            bg: 'bg-emerald-50',
            text: 'text-emerald-600'
        },
        {
            label: 'Active Services',
            value: '24',
            change: '2 added recently',
            positive: true,
            icon: 'uil-scissors',
            color: 'purple',
            bg: 'bg-purple-50',
            text: 'text-purple-600'
        }
    ];

    recentAppointments = [
        { client: 'Abena Mensah', service: 'Box Braids', stylist: 'Akosua', time: '9:00 AM', status: 'Confirmed' },
        { client: 'Yaa Asantewaa', service: 'Hair Relaxer', stylist: 'Ama', time: '10:30 AM', status: 'Completed' },
        { client: 'Adwoa Boateng', service: 'Ghana Weaving', stylist: 'Akosua', time: '12:00 PM', status: 'Pending' },
        { client: 'Efua Darko', service: 'Dreadlocks', stylist: 'Ama', time: '2:00 PM', status: 'Confirmed' },
        { client: 'Maame Frimpong', service: 'Hair Coloring', stylist: 'Adjoa', time: '3:30 PM', status: 'Cancelled' },
    ];

    topServices = [
        { name: 'Box Braids', bookings: 48, icon: 'uil-comment-alt-lines', color: 'rose' },
        { name: 'Ghana Weaving', bookings: 35, icon: 'uil-wind', color: 'amber' },
        { name: 'Hair Relaxer', bookings: 29, icon: 'uil-flask', color: 'emerald' },
        { name: 'Dreadlocks', bookings: 22, icon: 'uil-layers', color: 'purple' },
        { name: 'Hair Coloring', bookings: 18, icon: 'uil-palette', color: 'sky' },
    ];

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

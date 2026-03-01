import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-appointments',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {

    activeFilter = 'All';
    filters = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

    appointments = [
        { id: 'APT-001', client: 'Abena Mensah', phone: '055-123-4567', service: 'Box Braids', stylist: 'Akosua', date: 'Feb 25, 2026', time: '9:00 AM', duration: '3h', price: 'GH₵ 180', status: 'Confirmed' },
        { id: 'APT-002', client: 'Yaa Asantewaa', phone: '024-987-6543', service: 'Hair Relaxer', stylist: 'Ama', date: 'Feb 25, 2026', time: '10:30 AM', duration: '2h', price: 'GH₵ 120', status: 'Completed' },
        { id: 'APT-003', client: 'Adwoa Boateng', phone: '050-234-5678', service: 'Ghana Weaving', stylist: 'Akosua', date: 'Feb 25, 2026', time: '12:00 PM', duration: '2.5h', price: 'GH₵ 150', status: 'Pending' },
        { id: 'APT-004', client: 'Efua Darko', phone: '027-345-6789', service: 'Dreadlocks', stylist: 'Ama', date: 'Feb 25, 2026', time: '2:00 PM', duration: '4h', price: 'GH₵ 250', status: 'Confirmed' },
        { id: 'APT-005', client: 'Maame Frimpong', phone: '026-456-7890', service: 'Hair Coloring', stylist: 'Adjoa', date: 'Feb 25, 2026', time: '3:30 PM', duration: '2h', price: 'GH₵ 200', status: 'Cancelled' },
        { id: 'APT-006', client: 'Akua Amoah', phone: '020-567-8901', service: 'Washday', stylist: 'Adjoa', date: 'Feb 26, 2026', time: '9:00 AM', duration: '1h', price: 'GH₵ 60', status: 'Pending' },
        { id: 'APT-007', client: 'Ama Owusu', phone: '054-678-9012', service: 'Trim & Style', stylist: 'Akosua', date: 'Feb 26, 2026', time: '11:00 AM', duration: '1.5h', price: 'GH₵ 80', status: 'Confirmed' },
        { id: 'APT-008', client: 'Araba Andoh', phone: '023-789-0123', service: 'Locs Retouch', stylist: 'Ama', date: 'Feb 27, 2026', time: '2:00 PM', duration: '2h', price: 'GH₵ 130', status: 'Pending' },
    ];

    get filteredAppointments() {
        if (this.activeFilter === 'All') return this.appointments;
        return this.appointments.filter(a => a.status === this.activeFilter);
    }

    setFilter(f: string) {
        this.activeFilter = f;
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

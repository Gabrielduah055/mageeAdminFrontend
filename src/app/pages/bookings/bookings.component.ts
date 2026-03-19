import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../core/services/booking.service';

@Component({
    selector: 'app-bookings',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './bookings.component.html',
    styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

    activeFilter = 'All';
    filters = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];
    bookings: any[] = [];
    isLoading = true;
    errorMessage = '';
    updatingId: string | null = null;

    constructor(private bookingService: BookingService) {}

    ngOnInit(): void {
        this.loadBookings();
    }

    loadBookings(): void {
        this.isLoading = true;
        this.bookingService.getBookings().subscribe({
            next: (data) => {
                this.bookings = (data || []).map((b: any) => ({
                    _id: b._id,
                    id: b._id?.toString().slice(-6).toUpperCase(),
                    client: b.user?.name ?? 'Unknown',
                    email: b.user?.email ?? '',
                    phone: b.user?.phone ?? '',
                    service: b.service?.name ?? 'Unknown',
                    duration: b.service?.duration_minutes ? `${b.service.duration_minutes} min` : '',
                    price: b.service?.price ? `GH₵ ${b.service.price}` : '',
                    date: b.booking_date ?? '',
                    time: b.booking_time ?? '',
                    serviceType: b.service_type ?? '',
                    status: this.capitalizeFirst(b.status ?? 'pending'),
                    notes: b.notes ?? '',
                    address: b.address ?? '',
                }));
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error fetching bookings', err);
                this.errorMessage = 'Failed to load bookings.';
                this.isLoading = false;
            }
        });
    }

    get filteredBookings() {
        if (this.activeFilter === 'All') return this.bookings;
        return this.bookings.filter(b => b.status === this.activeFilter);
    }

    get filterCounts(): Record<string, number> {
        const counts: Record<string, number> = { All: this.bookings.length };
        for (const f of ['Pending', 'Confirmed', 'Completed', 'Cancelled']) {
            counts[f] = this.bookings.filter(b => b.status === f).length;
        }
        return counts;
    }

    setFilter(f: string) {
        this.activeFilter = f;
    }

    updateStatus(booking: any, newStatus: string): void {
        if (this.updatingId === booking._id) return;
        this.updatingId = booking._id;
        this.bookingService.updateStatus(booking._id, newStatus.toLowerCase()).subscribe({
            next: () => {
                booking.status = newStatus;
                this.updatingId = null;
            },
            error: (err) => {
                console.error('Error updating status', err);
                this.updatingId = null;
            }
        });
    }

    getNextStatuses(current: string): string[] {
        const map: Record<string, string[]> = {
            'Pending': ['Confirmed', 'Cancelled'],
            'Confirmed': ['Completed', 'Cancelled'],
            'Completed': [],
            'Cancelled': [],
        };
        return map[current] ?? [];
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

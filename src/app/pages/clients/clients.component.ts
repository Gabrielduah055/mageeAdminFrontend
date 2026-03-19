import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../core/services/client.service';

@Component({
    selector: 'app-clients',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
    searchTerm = '';
    clients: any[] = [];
    isLoading = true;
    errorMessage = '';

    selectedClient: any = null;
    clientDetail: any = null;
    clientBookings: any[] = [];
    loadingDetail = false;

    constructor(private clientService: ClientService) {}

    ngOnInit(): void {
        this.clientService.getClients().subscribe({
            next: (data) => {
                this.clients = data || [];
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error fetching clients', err);
                this.errorMessage = 'Failed to load clients.';
                this.isLoading = false;
            }
        });
    }

    get filteredClients() {
        if (!this.searchTerm) return this.clients;
        const term = this.searchTerm.toLowerCase();
        return this.clients.filter(c =>
            c.name?.toLowerCase().includes(term) ||
            c.email?.toLowerCase().includes(term) ||
            c.phone?.includes(this.searchTerm)
        );
    }

    onSearch(event: Event) {
        this.searchTerm = (event.target as HTMLInputElement).value;
    }

    openDetail(client: any): void {
        this.selectedClient = client;
        this.loadingDetail = true;
        this.clientDetail = null;
        this.clientBookings = [];
        this.clientService.getClientById(client._id).subscribe({
            next: (res) => {
                this.clientDetail = res.client;
                this.clientBookings = (res.bookings || []).map((b: any) => ({
                    _id: b._id,
                    service: b.service?.name ?? 'Unknown',
                    price: b.service?.price ? `GH₵ ${b.service.price}` : '',
                    date: b.booking_date,
                    time: b.booking_time,
                    status: this.capitalizeFirst(b.status ?? 'pending'),
                    serviceType: b.service_type,
                }));
                this.loadingDetail = false;
            },
            error: () => { this.loadingDetail = false; }
        });
    }

    closeDetail(): void {
        this.selectedClient = null;
        this.clientDetail = null;
        this.clientBookings = [];
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

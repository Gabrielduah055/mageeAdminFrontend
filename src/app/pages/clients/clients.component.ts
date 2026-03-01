import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-clients',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
    searchTerm = '';

    clients = [
        { name: 'Abena Mensah', phone: '055-123-4567', email: 'abena@mail.com', visits: 12, lastVisit: 'Feb 20, 2026', totalSpent: 'GH₵ 1,450', status: 'Regular' },
        { name: 'Yaa Asantewaa', phone: '024-987-6543', email: 'yaa@mail.com', visits: 8, lastVisit: 'Feb 25, 2026', totalSpent: 'GH₵ 980', status: 'Regular' },
        { name: 'Adwoa Boateng', phone: '050-234-5678', email: 'adwoa@mail.com', visits: 24, lastVisit: 'Feb 18, 2026', totalSpent: 'GH₵ 3,200', status: 'VIP' },
        { name: 'Efua Darko', phone: '027-345-6789', email: 'efua@mail.com', visits: 3, lastVisit: 'Jan 30, 2026', totalSpent: 'GH₵ 420', status: 'New' },
        { name: 'Maame Frimpong', phone: '026-456-7890', email: 'maame@mail.com', visits: 6, lastVisit: 'Feb 10, 2026', totalSpent: 'GH₵ 760', status: 'Regular' },
        { name: 'Akua Amoah', phone: '020-567-8901', email: 'akua@mail.com', visits: 18, lastVisit: 'Feb 22, 2026', totalSpent: 'GH₵ 2,100', status: 'VIP' },
        { name: 'Ama Owusu', phone: '054-678-9012', email: 'ama@mail.com', visits: 2, lastVisit: 'Feb 15, 2026', totalSpent: 'GH₵ 210', status: 'New' },
        { name: 'Araba Andoh', phone: '023-789-0123', email: 'araba@mail.com', visits: 9, lastVisit: 'Feb 12, 2026', totalSpent: 'GH₵ 1,100', status: 'Regular' },
    ];

    get filteredClients() {
        if (!this.searchTerm) return this.clients;
        return this.clients.filter(c =>
            c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            c.phone.includes(this.searchTerm)
        );
    }

    onSearch(event: Event) {
        this.searchTerm = (event.target as HTMLInputElement).value;
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'VIP': return 'bg-amber-50 text-amber-600';
            case 'Regular': return 'bg-blue-50 text-blue-600';
            case 'New': return 'bg-emerald-50 text-emerald-600';
            default: return 'bg-gray-100 text-gray-500';
        }
    }
}

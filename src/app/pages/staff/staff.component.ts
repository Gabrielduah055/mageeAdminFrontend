import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-staff',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './staff.component.html',
    styleUrls: ['./staff.component.css']
})
export class StaffComponent {

    staff = [
        {
            name: 'Akosua Mensah',
            role: 'Senior Stylist',
            specialty: 'Braiding & Natural Hair',
            experience: '6 years',
            clients: 87,
            rating: 4.9,
            todayBookings: 3,
            phone: '055-111-2222',
            status: 'Available'
        },
        {
            name: 'Ama Darko',
            role: 'Hair Stylist',
            specialty: 'Relaxer & Coloring',
            experience: '4 years',
            clients: 64,
            rating: 4.7,
            todayBookings: 2,
            phone: '024-333-4444',
            status: 'Busy'
        },
        {
            name: 'Adjoa Boateng',
            role: 'Junior Stylist',
            specialty: 'Treatments & Wash',
            experience: '2 years',
            clients: 31,
            rating: 4.5,
            todayBookings: 2,
            phone: '026-555-6666',
            status: 'Available'
        },
    ];

    getStatusClass(status: string): string {
        return status === 'Available'
            ? 'bg-emerald-50 text-emerald-600'
            : 'bg-amber-50 text-amber-600';
    }
}

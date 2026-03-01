import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

    activeTab = 'profile';
    savedMessage = '';

    profileForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.profileForm = this.fb.group({
            salonName: ['Magee Salon'],
            ownerName: ['Admin'],
            email: ['admin@magee.com'],
            phone: ['055-000-1111'],
            address: ['Accra, Ghana'],
            openTime: ['08:00'],
            closeTime: ['19:00'],
        });
    }

    setTab(tab: string) { this.activeTab = tab; }

    save() {
        this.savedMessage = 'Settings saved successfully!';
        setTimeout(() => this.savedMessage = '', 3000);
    }
}

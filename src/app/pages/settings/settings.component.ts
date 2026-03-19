import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { SettingsService } from '../../core/services/settings.service';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    @ViewChild('logoInput') logoInput!: ElementRef<HTMLInputElement>;

    activeTab = 'profile';
    savedMessage = '';
    errorMessage = '';
    isLoading = true;
    isSaving = false;
    isUploadingLogo = false;
    logoPreview: string | null = null;
    currentLogoUrl: string = '';

    profileForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private settingsService: SettingsService
    ) {
        this.profileForm = this.fb.group({
            salonName: [''],
            ownerName: [''],
            email: [''],
            phone: [''],
            address: [''],
            openTime: [''],
            closeTime: [''],
            logoUrl: [''],
        });
    }

    ngOnInit(): void {
        this.settingsService.getSettings().subscribe({
            next: (data) => {
                if (data) {
                    this.profileForm.patchValue(data);
                    this.currentLogoUrl = data.logoUrl ?? '';
                    this.logoPreview = data.logoUrl || null;
                }
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error fetching settings', err);
                this.errorMessage = 'Failed to load settings.';
                this.isLoading = false;
            }
        });
    }

    setTab(tab: string) { this.activeTab = tab; }

    triggerLogoUpload(): void {
        this.logoInput.nativeElement.click();
    }

    onLogoFileSelected(event: Event): void {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;

        // Show preview immediately
        const reader = new FileReader();
        reader.onload = (e) => {
            this.logoPreview = e.target?.result as string;
        };
        reader.readAsDataURL(file);

        // Upload to Cloudinary via the backend /upload endpoint
        this.isUploadingLogo = true;
        this.settingsService.uploadLogo(file).subscribe({
            next: (res) => {
                const url = res.url ?? res.secure_url ?? '';
                this.profileForm.patchValue({ logoUrl: url });
                this.currentLogoUrl = url;
                this.isUploadingLogo = false;
            },
            error: (err) => {
                console.error('Logo upload error', err);
                this.errorMessage = 'Failed to upload logo. Please try again.';
                this.isUploadingLogo = false;
            }
        });
    }

    save(): void {
        this.isSaving = true;
        this.errorMessage = '';

        this.settingsService.updateSettings(this.profileForm.value).subscribe({
            next: () => {
                this.isSaving = false;
                this.savedMessage = 'Settings saved successfully!';
                setTimeout(() => this.savedMessage = '', 3000);
            },
            error: (err) => {
                console.error('Error updating settings', err);
                this.errorMessage = 'Failed to save settings. Please try again.';
                this.isSaving = false;
            }
        });
    }
}

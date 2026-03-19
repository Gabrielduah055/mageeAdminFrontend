import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../core/services/service.service';

@Component({
    selector: 'app-services',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './services.component.html',
    styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {

    categories: string[] = ['All'];
    activeCategory = 'All';
    services: any[] = [];
    isLoading = true;
    errorMessage = '';

    showModal = false;
    editingService: any = null;
    isSaving = false;
    deletingId: string | null = null;

    serviceForm: FormGroup;

    constructor(
        private serviceService: ServiceService,
        private fb: FormBuilder
    ) {
        this.serviceForm = this.fb.group({
            name: ['', Validators.required],
            category: [''],
            price: ['', [Validators.required, Validators.min(0)]],
            duration_minutes: ['', [Validators.required, Validators.min(1)]],
            description: [''],
        });
    }

    ngOnInit(): void {
        this.loadServices();
    }

    loadServices(): void {
        this.isLoading = true;
        this.serviceService.getServices().subscribe({
            next: (data) => {
                this.services = data || [];
                const cats = Array.from(new Set(this.services.map(s => s.category).filter(Boolean)));
                this.categories = ['All', ...cats];
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error fetching services', err);
                this.errorMessage = 'Failed to load services.';
                this.isLoading = false;
            }
        });
    }

    get filteredServices() {
        if (this.activeCategory === 'All') return this.services;
        return this.services.filter(s => s.category === this.activeCategory);
    }

    setCategory(cat: string) { this.activeCategory = cat; }

    openAddModal(): void {
        this.editingService = null;
        this.serviceForm.reset({ name: '', category: '', price: '', duration_minutes: '', description: '' });
        this.showModal = true;
    }

    openEditModal(svc: any): void {
        this.editingService = svc;
        this.serviceForm.patchValue({
            name: svc.name,
            category: svc.category ?? '',
            price: svc.price,
            duration_minutes: svc.duration_minutes,
            description: svc.description ?? '',
        });
        this.showModal = true;
    }

    closeModal(): void {
        this.showModal = false;
        this.editingService = null;
    }

    saveService(): void {
        if (this.serviceForm.invalid) return;
        this.isSaving = true;
        const payload = { ...this.serviceForm.value };

        if (this.editingService) {
            this.serviceService.updateService(this.editingService._id, payload).subscribe({
                next: (updated) => {
                    const idx = this.services.findIndex(s => s._id === this.editingService._id);
                    if (idx !== -1) this.services[idx] = updated;
                    this.isSaving = false;
                    this.closeModal();
                    this.loadServices();
                },
                error: () => { this.isSaving = false; }
            });
        } else {
            this.serviceService.createService(payload).subscribe({
                next: () => {
                    this.isSaving = false;
                    this.closeModal();
                    this.loadServices();
                },
                error: () => { this.isSaving = false; }
            });
        }
    }

    deleteService(svc: any): void {
        if (!confirm(`Remove "${svc.name}"?`)) return;
        this.deletingId = svc._id;
        this.serviceService.deleteService(svc._id).subscribe({
            next: () => {
                this.services = this.services.filter(s => s._id !== svc._id);
                this.deletingId = null;
                this.loadServices();
            },
            error: () => { this.deletingId = null; }
        });
    }

    formatDuration(mins: number): string {
        if (!mins) return '';
        if (mins < 60) return `${mins} min`;
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return m > 0 ? `${h}h ${m}min` : `${h}h`;
    }
}

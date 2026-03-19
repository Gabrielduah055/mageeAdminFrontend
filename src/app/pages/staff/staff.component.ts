import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaffService } from '../../core/services/staff.service';

@Component({
    selector: 'app-staff',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './staff.component.html',
    styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

    staff: any[] = [];
    isLoading = true;
    errorMessage = '';

    showModal = false;
    editingMember: any = null;
    isSaving = false;
    deletingId: string | null = null;

    staffForm: FormGroup;

    constructor(
        private staffService: StaffService,
        private fb: FormBuilder
    ) {
        this.staffForm = this.fb.group({
            name: ['', Validators.required],
            role: ['', Validators.required],
            specialty: [''],
            phone: [''],
            email: [''],
            experience: [''],
            status: ['Available'],
        });
    }

    ngOnInit(): void {
        this.loadStaff();
    }

    loadStaff(): void {
        this.isLoading = true;
        this.staffService.getStaff().subscribe({
            next: (data) => {
                this.staff = data || [];
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error fetching staff', err);
                this.errorMessage = 'Failed to load staff members.';
                this.isLoading = false;
            }
        });
    }

    openAddModal(): void {
        this.editingMember = null;
        this.staffForm.reset({ name: '', role: '', specialty: '', phone: '', email: '', experience: '', status: 'Available' });
        this.showModal = true;
    }

    openEditModal(member: any): void {
        this.editingMember = member;
        this.staffForm.patchValue({
            name: member.name,
            role: member.role,
            specialty: member.specialty ?? '',
            phone: member.phone ?? '',
            email: member.email ?? '',
            experience: member.experience ?? '',
            status: member.status ?? 'Available',
        });
        this.showModal = true;
    }

    closeModal(): void {
        this.showModal = false;
        this.editingMember = null;
    }

    saveStaff(): void {
        if (this.staffForm.invalid) return;
        this.isSaving = true;
        const payload = { ...this.staffForm.value };

        if (this.editingMember) {
            this.staffService.updateStaff(this.editingMember._id, payload).subscribe({
                next: () => {
                    this.isSaving = false;
                    this.closeModal();
                    this.loadStaff();
                },
                error: () => { this.isSaving = false; }
            });
        } else {
            this.staffService.createStaff(payload).subscribe({
                next: () => {
                    this.isSaving = false;
                    this.closeModal();
                    this.loadStaff();
                },
                error: () => { this.isSaving = false; }
            });
        }
    }

    deleteStaff(member: any): void {
        if (!confirm(`Remove "${member.name}" from staff?`)) return;
        this.deletingId = member._id;
        this.staffService.deleteStaff(member._id).subscribe({
            next: () => {
                this.staff = this.staff.filter(s => s._id !== member._id);
                this.deletingId = null;
            },
            error: () => { this.deletingId = null; }
        });
    }

    getStatusClass(status: string): string {
        return status === 'Available'
            ? 'bg-emerald-50 text-emerald-600'
            : 'bg-amber-50 text-amber-600';
    }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    isLoading = false;
    showPassword = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4)]]
        });
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    onSubmit(): void {
        if (this.loginForm.invalid) return;

        this.isLoading = true;
        this.errorMessage = '';

        const {email, password} = this.loginForm.value;

        //create credentials object
        const credentials = { 
            email: email, 
            password: password,
            token:'' };

      this.authService.login(credentials).subscribe({
        next: (success) => {
            this.isLoading = false;
            if(success) {
                this.router.navigate(['/dashboard']);
            } else {
                this.errorMessage = 'Invalid email or password';
            }
        },
        error: (error) => {
            this.isLoading = false;
            this.errorMessage = error.error?.message || 'An error occurred during login. Please try again.';
            console.error('Login error:', error);
        }
      });
    }
}

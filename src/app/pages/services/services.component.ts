import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-services',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './services.component.html',
    styleUrl: './services.component.css'
})
export class ServicesComponent {

    categories = ['All', 'Braiding', 'Relaxer', 'Natural', 'Color', 'Treatment'];
    activeCategory = 'All';

    services = [
        { name: 'Box Braids', category: 'Braiding', duration: '3-4 hrs', price: 'GH₵ 150–250', icon: 'uil-comment-alt-lines', popular: true },
        { name: 'Ghana Weaving', category: 'Braiding', duration: '2-3 hrs', price: 'GH₵ 120–180', icon: 'uil-wind', popular: true },
        { name: 'Knotless Braids', category: 'Braiding', duration: '4-5 hrs', price: 'GH₵ 200–300', icon: 'uil-layers', popular: false },
        { name: 'Hair Relaxer', category: 'Relaxer', duration: '1.5-2 hrs', price: 'GH₵ 100–140', icon: 'uil-flask', popular: true },
        { name: 'Touch-up Relaxer', category: 'Relaxer', duration: '1-1.5 hrs', price: 'GH₵ 80–100', icon: 'uil-flask', popular: false },
        { name: 'Trim & Style', category: 'Natural', duration: '1-1.5 hrs', price: 'GH₵ 60–90', icon: 'uil-scissors', popular: false },
        { name: 'Dreadlocks', category: 'Natural', duration: '4-6 hrs', price: 'GH₵ 200–350', icon: 'uil-layers', popular: true },
        { name: 'Locs Retouch', category: 'Natural', duration: '1.5-2 hrs', price: 'GH₵ 100–130', icon: 'uil-sync', popular: false },
        { name: 'Full Hair Coloring', category: 'Color', duration: '2-3 hrs', price: 'GH₵ 180–280', icon: 'uil-palette', popular: true },
        { name: 'Highlights', category: 'Color', duration: '2-2.5 hrs', price: 'GH₵ 150–220', icon: 'uil-paint-tool', popular: false },
        { name: 'Deep Conditioning', category: 'Treatment', duration: '1 hr', price: 'GH₵ 60–80', icon: 'uil-tint', popular: false },
        { name: 'Washday Package', category: 'Treatment', duration: '1-1.5 hrs', price: 'GH₵ 50–70', icon: 'uil-droplet', popular: false },
    ];

    get filteredServices() {
        if (this.activeCategory === 'All') return this.services;
        return this.services.filter(s => s.category === this.activeCategory);
    }

    setCategory(cat: string) { this.activeCategory = cat; }
}

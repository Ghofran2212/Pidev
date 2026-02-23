import { Component, OnInit } from '@angular/core';
import { DeliveryService, Delivery } from '../../services/delivery.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-backoffice-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class BackofficeDeliveryComponent implements OnInit {
  availableDeliveries: Delivery[] = [];
  myDeliveries: Delivery[] = [];
  currentUser: User | null = null;
  activeTab: 'available' | 'managed' = 'available';
  sortBy: 'date' | 'price' = 'date';
  totalEarnings: number = 0;
  selectedDelivery: Delivery | null = null;

  constructor(
    private deliveryService: DeliveryService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  selectDelivery(delivery: Delivery): void {
    this.selectedDelivery = delivery;
  }

  closeDetails(): void {
    this.selectedDelivery = null;
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadDeliveries();
      }
    });

    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.activeTab = params['tab'];
      }
    });
  }

  loadDeliveries(): void {
    this.deliveryService.getAvailableDeliveries().subscribe(d => {
      this.availableDeliveries = this.sortDeliveries(d);
    });
    if (this.currentUser) {
      this.deliveryService.getMyDeliveries(this.currentUser.id).subscribe(d => {
        this.myDeliveries = this.sortDeliveries(d);
        this.calculateEarnings();
      });
    }
  }

  private sortDeliveries(deliveries: Delivery[]): Delivery[] {
    return deliveries.sort((a, b) => {
      if (this.sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.price - a.price;
      }
    });
  }

  calculateEarnings(): void {
    this.totalEarnings = this.myDeliveries
      .filter(d => d.status === 'DELIVERED')
      .reduce((sum, d) => sum + d.price, 0);
  }

  onSortChange(criteria: 'date' | 'price'): void {
    this.sortBy = criteria;
    this.loadDeliveries();
  }

  takeDelivery(id: string): void {
    if (this.currentUser) {
      this.deliveryService.takeDelivery(id, this.currentUser.id).subscribe(() => {
        this.loadDeliveries();
      });
    }
  }

  declineDelivery(id: string): void {
    this.deliveryService.declineDelivery(id).subscribe(() => {
      this.loadDeliveries();
    });
  }

  completeDelivery(id: string): void {
    this.deliveryService.updateStatus(id, 'DELIVERED').subscribe(() => {
      this.loadDeliveries();
    });
  }
}

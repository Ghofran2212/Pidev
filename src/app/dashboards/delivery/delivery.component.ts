import { Component } from '@angular/core';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent {
  deliveries = [
    { id: 'ORD-1235', status: 'In Transit', receiver: 'Alice Smith', destination: '45 Lake View Road, Camp Site Alpha', assigned: '2h ago' },
    { id: 'ORD-1238', status: 'Pending', receiver: 'John Brown', destination: '12 Forest Path, Wild Area 3', assigned: '1h ago' },
    { id: 'ORD-1240', status: 'In Transit', receiver: 'Emma Wilson', destination: 'River Bend, Site 7', assigned: '30m ago' }
  ];

  markDelivered(delivery: any) {
    delivery.status = 'Delivered';
  }
}

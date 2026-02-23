import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent implements OnInit {
  orderId: string = '';
  step: number = 2; // Mocking current step
  status: string = 'Processing';

  ngOnInit() {
    this.orderId = Math.random().toString(36).substr(2, 6).toUpperCase();

    // Simulate status update
    setTimeout(() => {
      this.step = 3;
      this.status = 'In Transit';
    }, 5000);
  }
}

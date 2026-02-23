import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../../services/auth.service';
import { Event } from '../../../models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  categories: string[] = ['All', 'Event', 'Outdoor Trip'];
  selectedCategory: string = 'All';
  selectedEvent: Event | null = null;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.filteredEvents = events;
    });
  }

  filterEvents() {
    if (this.selectedCategory === 'All') {
      this.filteredEvents = this.events;
    } else {
      this.filteredEvents = this.events.filter(e => e.category === this.selectedCategory);
    }
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterEvents();
  }

  openDetails(event: Event) {
    this.selectedEvent = event;
  }

  closeDetails() {
    this.selectedEvent = null;
  }

  bookEvent(event: Event) {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.eventService.bookEvent(event.id, user.id).subscribe({
      next: (booking) => {
        alert(`Successfully booked ${event.title}!`);
      },
      error: (err) => {
        console.error('Booking failed:', err);
      }
    });
  }
}

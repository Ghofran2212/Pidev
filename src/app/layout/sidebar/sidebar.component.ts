import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../models/user.model';

interface MenuItem {
  title: string;
  icon: string;
  link: string;
  roles: UserRole[];
  queryParams?: any;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  menuItems: MenuItem[] = [
    { title: 'Dashboard', icon: 'fa-chart-line', link: '/admin/dashboard', roles: [UserRole.ADMIN, UserRole.GEAR_PROVIDER, UserRole.CAMPSITE_OWNER, UserRole.WILD_CAMPSITE_ADMIN, UserRole.SPONSOR, UserRole.DELIVERY_PERSONNEL, UserRole.FORUM_MODERATOR, UserRole.GUIDE, UserRole.EVENT_ORGANIZER] },
    { title: 'Users', icon: 'fa-users', link: '/admin/users', roles: [UserRole.ADMIN] },
    { title: 'My Gear', icon: 'fa-shopping-bag', link: '/admin/gear-provider', roles: [UserRole.GEAR_PROVIDER, UserRole.ADMIN] },
    { title: 'Orders', icon: 'fa-box', link: '/admin/orders', roles: [UserRole.GEAR_PROVIDER, UserRole.ADMIN] },
    { title: 'Campsites', icon: 'fa-campground', link: '/admin/campsites', roles: [UserRole.CAMPSITE_OWNER, UserRole.ADMIN] },
    { title: 'Wild Campsites', icon: 'fa-map-marked-alt', link: '/admin/route-map', roles: [UserRole.WILD_CAMPSITE_ADMIN, UserRole.ADMIN] },
    { title: 'Sponsorships', icon: 'fa-handshake', link: '/admin/sponsor', roles: [UserRole.SPONSOR, UserRole.ADMIN] },
    { title: 'Available Deliveries', icon: 'fa-truck-loading', link: '/admin/deliveries', roles: [UserRole.DELIVERY_PERSONNEL], queryParams: { tab: 'available' } },
    { title: 'My Deliveries', icon: 'fa-shipping-fast', link: '/admin/deliveries', roles: [UserRole.DELIVERY_PERSONNEL], queryParams: { tab: 'managed' } },
    { title: 'System Deliveries', icon: 'fa-truck', link: '/admin/deliveries', roles: [UserRole.ADMIN] },
    { title: 'Forum Moderation', icon: 'fa-comments', link: '/admin/forum-mod', roles: [UserRole.FORUM_MODERATOR, UserRole.ADMIN] },
    { title: 'Trips', icon: 'fa-compass', link: '/admin/guide', roles: [UserRole.GUIDE, UserRole.ADMIN] },
    { title: 'Events', icon: 'fa-calendar-alt', link: '/admin/events', roles: [UserRole.EVENT_ORGANIZER, UserRole.ADMIN] },
    { title: 'Back to Site', icon: 'fa-home', link: '/home', roles: [UserRole.ADMIN, UserRole.GEAR_PROVIDER, UserRole.CAMPSITE_OWNER, UserRole.WILD_CAMPSITE_ADMIN, UserRole.SPONSOR, UserRole.DELIVERY_PERSONNEL, UserRole.FORUM_MODERATOR, UserRole.GUIDE, UserRole.EVENT_ORGANIZER] },
    { title: 'Logout', icon: 'fa-sign-out-alt', link: '/login', roles: [UserRole.ADMIN, UserRole.GEAR_PROVIDER, UserRole.CAMPSITE_OWNER, UserRole.WILD_CAMPSITE_ADMIN, UserRole.SPONSOR, UserRole.DELIVERY_PERSONNEL, UserRole.FORUM_MODERATOR, UserRole.GUIDE, UserRole.EVENT_ORGANIZER] },
  ];

  filteredMenuItems: MenuItem[] = [];

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        // Update the main Dashboard link based on role
        const dashItem = this.menuItems.find(item => item.title === 'Dashboard');
        if (dashItem) {
          dashItem.link = this.getDashboardLink(user.role);
        }
        this.filteredMenuItems = this.menuItems.filter(item => item.roles.includes(user.role));
      }
    });
  }

  getDashboardLink(role: UserRole): string {
    switch (role) {
      case UserRole.ADMIN: return '/admin/dashboard';
      case UserRole.GEAR_PROVIDER: return '/admin/gear-provider';
      case UserRole.CAMPSITE_OWNER: return '/admin/campsites';
      case UserRole.WILD_CAMPSITE_ADMIN: return '/admin/route-map';
      case UserRole.SPONSOR: return '/admin/sponsor';
      case UserRole.DELIVERY_PERSONNEL: return '/admin/deliveries';
      case UserRole.FORUM_MODERATOR: return '/admin/forum-mod';
      case UserRole.GUIDE: return '/admin/guide';
      case UserRole.EVENT_ORGANIZER: return '/admin/events';
      default: return '/admin/dashboard';
    }
  }
}

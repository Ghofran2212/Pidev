import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// BackOffice Imports
import { MainLayoutComponent as BackofficeLayout } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouteMapComponent } from './dashboards/route-map/route-map.component';
import { SponsorComponent } from './dashboards/sponsor/sponsor.component';
import { GuideComponent } from './dashboards/guide/guide.component';
import { GearProviderComponent } from './dashboards/gear-provider/gear-provider.component';

// FrontOffice Imports
import { MainLayoutComponent as FrontofficeLayout } from './frontoffice/layout/main-layout/main-layout.component';
import { HomeComponent } from './frontoffice/pages/home/home.component';
import { CampsitesComponent } from './frontoffice/pages/campsites/campsites.component';
import { OutdoorTripsComponent } from './frontoffice/pages/outdoor-trips/outdoor-trips.component';
import { ShopComponent } from './frontoffice/pages/shop/shop.component';
import { EventsComponent } from './frontoffice/pages/events/events.component';
import { ForumComponent } from './frontoffice/pages/forum/forum.component';
import { MessagesComponent } from './frontoffice/pages/messages/messages.component';
import { LoginComponent } from './frontoffice/pages/login/login.component';
import { RegisterComponent } from './frontoffice/pages/register/register.component';

const routes: Routes = [
  // Redirect root to front office
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Front Office Routes
  {
    path: '',
    component: FrontofficeLayout,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'campsites', component: CampsitesComponent },
      { path: 'outdoor-trips', component: OutdoorTripsComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'events', component: EventsComponent },
      { path: 'forum', component: ForumComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },

  // Back Office Routes
  {
    path: 'admin',
    component: BackofficeLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'route-map', component: RouteMapComponent },
      { path: 'sponsor', component: SponsorComponent },
      { path: 'guide', component: GuideComponent },
      { path: 'gear-provider', component: GearProviderComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// BackOffice Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HeaderComponent as BackHeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent as BackFooterComponent } from './layout/footer/footer.component';
import { RouteMapComponent } from './dashboards/route-map/route-map.component';
import { SponsorComponent } from './dashboards/sponsor/sponsor.component';
import { GuideComponent } from './dashboards/guide/guide.component';
import { GearProviderComponent } from './dashboards/gear-provider/gear-provider.component';

// FrontOffice Components
import { MainLayoutComponent as FrontMainLayoutComponent } from './frontoffice/layout/main-layout/main-layout.component';
import { HeaderComponent as FrontHeaderComponent } from './frontoffice/layout/header/header.component';
import { FooterComponent as FrontFooterComponent } from './frontoffice/layout/footer/footer.component';
import { HomeComponent } from './frontoffice/pages/home/home.component';
import { CampsitesComponent } from './frontoffice/pages/campsites/campsites.component';
import { OutdoorTripsComponent } from './frontoffice/pages/outdoor-trips/outdoor-trips.component';
import { ShopComponent } from './frontoffice/pages/shop/shop.component';
import { EventsComponent } from './frontoffice/pages/events/events.component';
import { ForumComponent } from './frontoffice/pages/forum/forum.component';
import { MessagesComponent } from './frontoffice/pages/messages/messages.component';
import { LoginComponent } from './frontoffice/pages/login/login.component';
import { RegisterComponent } from './frontoffice/pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainLayoutComponent,
    BackHeaderComponent,
    SidebarComponent,
    BackFooterComponent,
    RouteMapComponent,
    SponsorComponent,
    GuideComponent,
    GearProviderComponent,
    FrontMainLayoutComponent,
    FrontHeaderComponent,
    FrontFooterComponent,
    HomeComponent,
    CampsitesComponent,
    OutdoorTripsComponent,
    ShopComponent,
    EventsComponent,
    ForumComponent,
    MessagesComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
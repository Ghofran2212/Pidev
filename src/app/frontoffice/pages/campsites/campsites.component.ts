import { Component, OnInit } from '@angular/core';
import { CampsiteService } from '../../../services/campsite.service';
import { Campsite } from '../../../models/campsite.model';

@Component({
  selector: 'app-campsites',
  templateUrl: './campsites.component.html',
  styleUrl: './campsites.component.css'
})
export class CampsitesComponent implements OnInit {
  campsites: Campsite[] = [];
  filteredCampsites: Campsite[] = [];

  filterType: 'All' | 'Owned' | 'Ownerless' = 'All';
  sortBy: 'name' | 'price' | 'rating' = 'name';
  searchQuery: string = '';
  selectedCampsite: Campsite | null = null;

  constructor(private campsiteService: CampsiteService) { }

  ngOnInit() {
    this.campsiteService.getCampsites().subscribe(sites => {
      this.campsites = sites;
      this.applyFilters();
    });
  }

  applyFilters() {
    let result = [...this.campsites];

    // Search Filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.location.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query)
      );
    }

    // Type Filter
    if (this.filterType !== 'All') {
      const needsOwner = this.filterType === 'Owned';
      result = result.filter(c => c.hasOwner === needsOwner);
    }

    // Sort
    result.sort((a, b) => {
      if (this.sortBy === 'name') return a.name.localeCompare(b.name);
      if (this.sortBy === 'price') return a.pricePerNight - b.pricePerNight;
      if (this.sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    this.filteredCampsites = result;
  }

  setFilterType(type: 'All' | 'Owned' | 'Ownerless') {
    this.filterType = type;
    this.applyFilters();
  }

  setSortBy(sort: 'name' | 'price' | 'rating') {
    this.sortBy = sort;
    this.applyFilters();
  }

  openDetails(site: Campsite) {
    this.selectedCampsite = site;
  }

  closeDetails() {
    this.selectedCampsite = null;
  }
}

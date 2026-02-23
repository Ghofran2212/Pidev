import { Component, OnInit } from '@angular/core';
import { ForumService, ForumCategory, ForumThread } from '../../../services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit {
  categories: ForumCategory[] = [];
  selectedCategory: ForumCategory | null = null;
  threads: ForumThread[] = [];

  constructor(private forumService: ForumService) { }

  ngOnInit() {
    this.forumService.getCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

  selectCategory(category: ForumCategory) {
    this.selectedCategory = category;
    this.forumService.getThreadsByCategory(category.id).subscribe(threads => {
      this.threads = threads;
    });
  }

  backToCategories() {
    this.selectedCategory = null;
    this.threads = [];
  }
}

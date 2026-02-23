import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ForumPost {
    id: string;
    threadId: string;
    userId: string;
    userName: string;
    content: string;
    date: Date;
}

export interface ForumThread {
    id: string;
    categoryId: string;
    title: string;
    authorId: string;
    authorName: string;
    date: Date;
    postsCount: number;
}

export interface ForumCategory {
    id: string;
    name: string;
    description: string;
    icon: string;
}

@Injectable({
    providedIn: 'root'
})
export class ForumService {
    private categories: ForumCategory[] = [
        { id: 'c1', name: 'General Discussion', description: 'Talk about anything camping related.', icon: 'fa-comments' },
        { id: 'c2', name: 'Gear Reviews', description: 'Share your thoughts on the latest camping gear.', icon: 'fa-tools' },
        { id: 'c3', name: 'Campsite Recommendations', description: 'Find and share the best places to camp.', icon: 'fa-map-marked-alt' }
    ];

    private threads: ForumThread[] = [
        { id: 't1', categoryId: 'c1', title: 'Best time for mountain camping?', authorId: 'u1', authorName: 'Alice', date: new Date(), postsCount: 5 },
        { id: 't2', categoryId: 'c2', title: 'Is the Ultra Lightweight Tent worth it?', authorId: 'u2', authorName: 'Bob', date: new Date(), postsCount: 2 }
    ];

    getCategories(): Observable<ForumCategory[]> {
        return of(this.categories);
    }

    getThreadsByCategory(categoryId: string): Observable<ForumThread[]> {
        return of(this.threads.filter(t => t.categoryId === categoryId));
    }

    createThread(thread: Omit<ForumThread, 'id' | 'date' | 'postsCount'>): Observable<ForumThread> {
        const newThread: ForumThread = {
            ...thread,
            id: Math.random().toString(36).substr(2, 9),
            date: new Date(),
            postsCount: 1
        };
        this.threads.push(newThread);
        return of(newThread);
    }
}

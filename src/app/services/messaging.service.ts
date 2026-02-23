import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    date: Date;
    isRead: boolean;
}

export interface ChatSession {
    id: string;
    participantId: string;
    participantName: string;
    lastMessage: string;
    lastMessageDate: Date;
    unreadCount: number;
}

@Injectable({
    providedIn: 'root'
})
export class MessagingService {
    private messages: Message[] = [];
    private sessions: ChatSession[] = [
        { id: 's1', participantId: 'u1', participantName: 'Alice', lastMessage: 'Hey, are you going to the event?', lastMessageDate: new Date(), unreadCount: 1 },
        { id: 's2', participantId: 'u2', participantName: 'Bob', lastMessage: 'Thanks for the gear recommendation!', lastMessageDate: new Date(), unreadCount: 0 }
    ];

    getSessions(userId: string): Observable<ChatSession[]> {
        return of(this.sessions);
    }

    getMessages(sessionId: string): Observable<Message[]> {
        return of(this.messages);
    }

    sendMessage(senderId: string, receiverId: string, content: string): Observable<Message> {
        const newMessage: Message = {
            id: Math.random().toString(36).substr(2, 9),
            senderId,
            receiverId,
            content,
            date: new Date(),
            isRead: false
        };
        this.messages.push(newMessage);
        return of(newMessage);
    }
}

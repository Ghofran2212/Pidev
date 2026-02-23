import { Component, OnInit } from '@angular/core';
import { MessagingService, ChatSession, Message } from '../../../services/messaging.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
  sessions: ChatSession[] = [];
  selectedSession: ChatSession | null = null;
  messages: Message[] = [];
  newMessage: string = '';

  constructor(
    private messagingService: MessagingService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.messagingService.getSessions(user.id).subscribe(sessions => {
        this.sessions = sessions;
      });
    }
  }

  selectSession(session: ChatSession) {
    this.selectedSession = session;
    this.messagingService.getMessages(session.id).subscribe(msgs => {
      this.messages = msgs;
    });
  }

  sendMessage() {
    const user = this.authService.getCurrentUser();
    if (user && this.selectedSession && this.newMessage.trim()) {
      this.messagingService.sendMessage(user.id, this.selectedSession.participantId, this.newMessage).subscribe(msg => {
        this.messages.push(msg);
        this.selectedSession!.lastMessage = this.newMessage;
        this.selectedSession!.lastMessageDate = new Date();
        this.newMessage = '';
      });
    }
  }
}

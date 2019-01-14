import { Injectable } from '@angular/core';
import { LogPublishers, LogConsole, LogLocalStorage } from './log-publishers';

@Injectable({
  providedIn: 'root'
})
export class LogPublisherService {
  publishers: LogPublishers[] = [];

  constructor() {
    this.buildPublishers();
  }

  buildPublishers(): void {
    this.publishers.push(new LogConsole());
    this.publishers.push(new LogLocalStorage());
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  LogPublishers,
  LogConsole,
  LogLocalStorage,
  LogWebApi
} from './log-publishers';

@Injectable({
  providedIn: 'root'
})
export class LogPublisherService {
  publishers: LogPublishers[] = [];

  constructor(private http: HttpClient) {
    this.buildPublishers();
  }

  buildPublishers(): void {
    this.publishers.push(new LogConsole());
    this.publishers.push(new LogLocalStorage());
    this.publishers.push(new LogWebApi(this.http));
  }
}

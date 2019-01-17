import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import {
  LogPublishers,
  LogConsole,
  LogLocalStorage,
  LogWebApi,
  LogPublisherConfig
} from './log-publishers';

const PUBLISHERS_FILE = 'assets/log-publishers.json';

@Injectable({
  providedIn: 'root'
})
export class LogPublisherService {
  publishers: LogPublishers[] = [];

  constructor(private http: HttpClient) {
    this.buildPublishers();
  }

  buildPublishers(): void {
    // this.publishers.push(new LogConsole());
    // this.publishers.push(new LogLocalStorage());
    // this.publishers.push(new LogWebApi(this.http));

    let logPub: LogPublishers;

    this.getLoggers().subscribe(resp => {
      for (const pub of resp.filter(p => p.isActive)) {
        switch (pub.loggerName.toLowerCase()) {
          case 'console':
            logPub = new LogConsole();
            break;
          case 'localstorage':
            logPub = new LogLocalStorage();
            break;
          case 'webapi':
            logPub = new LogWebApi(this.http);
            break;
        }

        logPub.location = pub.loggerLocation;
        this.publishers.push(logPub);
      }
    });
  }

  getLoggers(): Observable<LogPublisherConfig[]> {
    return this.http.get<any>(PUBLISHERS_FILE).pipe(
      tap(resp => JSON.stringify(resp)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let message = '';
    const errors: string[] = [];

    console.log(error);

    message = 'Error Name: ' + error.name;
    message += ' - Status Text' + error.status;

    if (error.error instanceof ErrorEvent) {
      message += `An error occurred: ${error.error.message}`;
    } else {
      message += `Backend returned code ${error.status}: ${error.body.error}`;
    }

    errors.push(message);
    console.error('An error occured', errors);

    return throwError(errors);
  }
}

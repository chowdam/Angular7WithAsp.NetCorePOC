import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogEntry } from './log-entry';
import { throwError, Observable, of } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

export abstract class LogPublishers {
  location: string;

  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}

export class LogConsole extends LogPublishers {
  log(record: LogEntry): Observable<boolean> {
    console.log(record.buildLogString());
    return of(true);
  }

  clear(): Observable<boolean> {
    console.clear();
    return of(true);
  }
}

export class LogLocalStorage extends LogPublishers {
  constructor() {
    super();

    this.location = 'logging';
  }

  log(record: LogEntry): Observable<boolean> {
    let ret = false;
    let values: LogEntry[];

    try {
      values = JSON.parse(localStorage.getItem(this.location)) || [];
      values.push(record);
      localStorage.setItem(this.location, JSON.stringify(values));
      ret = true;
    } catch (ex) {
      console.log(ex);
    }
    return of(ret);
  }

  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return of(true);
  }

  getAll(): Observable<LogEntry[]> {
    let values: LogEntry[];
    values = JSON.parse(localStorage.getItem(this.location)) || [];

    return of(values);
  }
}

export class LogWebApi extends LogPublishers {
  constructor(private http: HttpClient) {
    super();
    this.location = 'htp://localhost:5000/api/log';
  }
  log(record: LogEntry): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    return this.http.post(this.location, record, { headers: headers }).pipe(
      retry(3),
      tap(resp => console.log('published log to web api')),
      catchError(this.handleErrors)
    );
  }

  clear(): Observable<boolean> {
    return of(true);
  }

  private handleErrors(error: any): Observable<any> {
    const errors: string[] = [];
    let message = '';

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

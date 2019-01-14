import { LogEntry } from './log-entry';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

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
    const ret = false;
    let values: LogEntry[];

    try {
      values = JSON.parse(localStorage.getItem(this.location)) || [];
      values.push(record);
      localStorage.setItem(this.location, JSON.stringify(values));
    } catch (ex) {
      console.log(ex);
    }
    return of(ret);
  }

  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return of(true);
  }
}

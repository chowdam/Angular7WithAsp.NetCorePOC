import { LogLocalStorage } from './../../_logging/log-publishers';
import { LogEntry } from './../../_logging/log-entry';
import { LogLevel } from './../../_logging/log-level';
import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/_logging/logging.service';
import { Log } from './log';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  logEntries: LogEntry[];

  constructor(private logger: LoggingService) {}

  ngOnInit() {}

  testlog() {
    this.logger.log('Test the log method', 'Lakshmi', 'Chowdam');
  }

  clearlog() {
    this.logger.clear();
    this.logEntries = [];
  }

  logObject(): void {
    const log = new Log();
    log.id = 1;
    log.message = 'Log message';
    log.createdDate = new Date();

    this.logger.log('This is Log Object', log);
  }

  getLocalStorage(): void {
    const temp = this.logger.publishers.find(
      p => p.constructor.name === 'LogLocalStorage'
    );
    console.log('temp: ' + temp);
    if (temp != null) {
      const lcoal = temp as LogLocalStorage;

      lcoal.getAll().subscribe(resp => (this.logEntries = resp));
    }
  }
}

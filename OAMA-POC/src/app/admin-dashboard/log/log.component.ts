import { LogLocalStorage } from './../../_logging/log-publishers';
import { LogEntry } from './../../_logging/log-entry';
import { LogLevel } from './../../_logging/log-level';
import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/_logging/logging.service';

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
  }

  getLocalStorage(): void {
    const temp = this.logger.publishers.find(
      p => p.constructor.name === 'LogLocalSTorage'
    );
    if (temp != null) {
      const lcoal = temp as LogLocalStorage;

      localStorage.getAll().subscribe(resp => (this.logEntries = resp));
    }
  }
}

import { LogPublisherService } from './log-publisher.service';
import { LogEntry } from './log-entry';
import { Injectable } from '@angular/core';
import { LogLevel } from './log-level';
import { LogPublishers } from './log-publishers';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  level: LogLevel = LogLevel.All;
  logWithDate = true;
  publishers: LogPublishers[];

  constructor(private publishersService: LogPublisherService) {
    this.publishers = this.publishersService.publishers;
  }

  private shouldLog(level: LogLevel) {
    const ret = false;
    if (this.level !== LogLevel.Off && level >= this.level) {
      return true;
    }
    return ret;
  }

  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  log(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }

  log1(msg: any) {
    console.log(new Date() + ' - ' + JSON.stringify(msg));
  }

  clear(): void {
    for (const logger of this.publishers) {
      logger.clear();
    }
  }

  private writeToLog(msg: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
      const entry: LogEntry = new LogEntry();
      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;

      // log value to all publishers
      for (const logegr of this.publishers) {
        logegr.log(entry).subscribe(resp => console.log(resp));
      }

      console.log(entry.buildLogString());
    }
  }
}

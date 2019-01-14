import { LogLevel } from './log-level';

export class LogEntry {
  entryDate: Date = new Date();
  message = '';
  level: LogLevel = LogLevel.Debug;
  extraInfo: any[] = [];
  logWithDate = true;
  buildLogString(): string {
    let ret = '';

    if (this.logWithDate) {
      ret = new Date() + ' - ';
    }

    ret += 'Type: ' + LogLevel[this.level];
    ret += ' - Message: ' + this.message;

    if (this.extraInfo) {
      ret += ' - ExtraInfo: ' + this.formatParams(this.extraInfo);
    }

    return ret;
  }

  private formatParams(params: any[]): string {
    let ret: string = params.join(','); // craete comma deliemted string
    if (params.some(p => typeof p === 'object')) {
      // is object in the array?
      ret = '';
      for (const item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }

    return ret;
  }
}

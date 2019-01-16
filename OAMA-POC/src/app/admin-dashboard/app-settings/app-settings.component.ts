import { LoggingService } from 'src/app/_logging/logging.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})
export class AppSettingsComponent implements OnInit {
  constructor(private logger: LoggingService) {}

  ngOnInit() {}
}

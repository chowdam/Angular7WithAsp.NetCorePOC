import { LoggingService } from '../../_logging/logging.service';
import { Component, OnInit } from '@angular/core';
import { AppUserAuth } from 'src/app/_security/app-user-auth';
import { AuthService } from 'src/app/_security/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'OAMA-POC';
  securityObject: AppUserAuth = null;

  constructor(
    private authService: AuthService,
    private logger: LoggingService
  ) {
    this.securityObject = authService.securityObject;
    this.logger.log('Welcome Home!', this.securityObject.userName);
  }

  ngOnInit() {}
}

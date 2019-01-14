import { Component, OnInit } from '@angular/core';
import { AppUserAuth } from 'src/app/_security/app-user-auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_security/auth.service';
import { LoggingService } from 'src/app/_logging/logging.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  securityObject: AppUserAuth = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private logger: LoggingService
  ) {
    this.securityObject = authService.securityObject;
    this.logger.log('Welcome About!');
  }

  ngOnInit() {}
}

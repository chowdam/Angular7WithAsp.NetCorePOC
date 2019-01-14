import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_security/auth.service';
import { AppUserAuth } from 'src/app/_security/app-user-auth';
import { Router } from '@angular/router';
import { LoggingService } from 'src/app/_logging/logging.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  securityObject: AppUserAuth = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private logger: LoggingService
  ) {
    this.securityObject = authService.securityObject;
  }

  ngOnInit() {}

  logout(): void {
    this.authService.logout();

    this.router.navigate(['/login']);
  }
}

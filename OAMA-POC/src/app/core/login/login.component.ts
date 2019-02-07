import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef
} from "@angular/core";
import { AppUserAuth } from "src/app/_security/app-user-auth";
import { AppUser } from "src/app/_security/app-user";
import { AuthService } from "src/app/_security/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, AfterViewInit {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth;
  returnUrl: string;
  errorMessage: string;
  mouseoverLogin = false;
  loginInvalid = false;

  @ViewChild("usernameEle") usernameEleRef: ElementRef;
  @ViewChild(NgForm) loginForm: NgForm;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
  }

  ngAfterViewInit(): void {
    if (this.usernameEleRef.nativeElement) {
      this.usernameEleRef.nativeElement.focus();
    }
  }

  login() {
    this.authService.signin(this.user).subscribe(
      resp => {
        if (resp) {
          this.loginInvalid = true;
          console.log(resp);
          this.securityObject = resp;
          this.router.navigateByUrl(this.returnUrl);
          if (this.route.snapshot.queryParamMap.get("returnUrl")) {
            // console.log(this.route.snapshot.queryParamMap.get('returnUrl'));
            this.router.navigate([
              this.route.snapshot.queryParamMap.get("returnUrl")
            ]);
          }

          // this.router.navigate(['home']);
        } else {
          this.router.navigate(["home"]);
        }
      },
      () => {
        // Initialize security object to display error message
        this.securityObject = new AppUserAuth();
      }
    );
  }

  cancel() {
    this.router.navigate(["home"]);
  }
}

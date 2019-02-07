import { Observable, BehaviorSubject, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, tap, catchError } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AppUserAuth } from "./app-user-auth";
import { of } from "rxjs";
import { AppUser } from "./app-user";
import { LOGIN_MOCKS } from "./login-mocks";
import { environment } from "src/environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = environment.baseUrl + "/api/user/";
  userName = "";

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  expirationDate: any;
  isExpired: any;

  securityObject: AppUserAuth = new AppUserAuth();
  private currentUserSubject: BehaviorSubject<AppUserAuth>;
  public currentUser: Observable<AppUserAuth>;

  private _loggedInStatus: boolean;
  set loggedInStatus(value: boolean) {
    this._loggedInStatus = value;
  }
  get loggedInStatus(): boolean {
    return this._loggedInStatus;
  }

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AppUserAuth>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AppUserAuth {
    return this.currentUserSubject.value;
  }

  // login using in memory data
  login(entity: AppUser): Observable<AppUserAuth> {
    this.resetSecurityObject();

    Object.assign(
      this.securityObject,
      LOGIN_MOCKS.find(
        user => user.userName.toLowerCase() === entity.userName.toLowerCase()
      )
    );
    if (this.securityObject.userName !== "") {
      // Store into local storage

      localStorage.setItem("token", this.securityObject.token);
      localStorage.setItem("currentUser", JSON.stringify(this.securityObject));
      localStorage.setItem(
        "apitoken",
        // tslint:disable-next-line:max-line-length
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJPbmJvYXJkQU1BYWRtaW4iLCJ1bmlxdWVfbmFtZSI6Ik9uYm9hcmRBTUFhZG1pbiIsInJvbGUiOiJhZG1pbiIsIkFjY2Vzc0xldmVsIjoiQWxsIiwibmJmIjoxNTQ5MDU0NTIxLCJleHAiOjE1NDkwNTgxMjEsImlhdCI6MTU0OTA1NDUyMSwiaXNzIjoiaHR0cHM6Ly9vYW1hc3ZjLmF6dXJld2Vic2l0ZXMubmV0LyIsImF1ZCI6Imh0dHBzOi8vb2FtYXN2Yy5henVyZXdlYnNpdGVzLm5ldC8ifQ.Vf6WVcLr2dC7PP103VByK7O - 8p8YOssHAQ6kf1NjFH066ho1g_vnYGrezN_fSscdl_f40a - MD_Ttr - yXPjNPaw"
      );
    }
    this.securityObject.isAuthenticated = true;
    return of<AppUserAuth>(this.securityObject);
  }

  // login using in memory data
  signin(entity: AppUser): Observable<AppUserAuth> {
    // Initialize security object
    this.resetSecurityObject();
    entity.userName = "OnboardAMAadmin";
    entity.password = "1478C4C9-624E-4D8E-A95F-F7E000F06673";
    const apiloginUrl = "https://oamasvc.azurewebsites.net/api/Auth/login";
    // "https://pocoama.azurewebsites.net/api/user/signin"; // "https://oamasvc.azurewebsites.net/api/Auth/login";

    return this.http.post<AppUserAuth>(apiloginUrl, entity, httpOptions).pipe(
      tap(resp => {
        // Use object assign to update the current object
        // NOTE: Don't create a new AppUserAuth object
        //       because that destroys all references to object
        Object.assign(this.securityObject, resp);
        // Store into local storage
        localStorage.setItem("token", this.securityObject.token);
        localStorage.setItem(
          "currentUser",
          JSON.stringify(this.securityObject)
        );
        this.decodedToken = this.jwtHelper.decodeToken(
          this.securityObject.token
        );
        this.userName = this.decodedToken.unique_name;
        this.expirationDate = this.jwtHelper.getTokenExpirationDate(
          this.securityObject.token
        );
        this.isExpired = this.jwtHelper.isTokenExpired(
          this.securityObject.token
        );
        console.log(this.decodedToken);

        this.securityObject.isAuthenticated = true;
      })
    );
  }

  private handleError(err) {
    console.log(err);
    console.error(err);
    return throwError(err);
  }

  register(model: any) {
    return this.http.post(this.baseUrl + "register", model);
  }

  loggedIn() {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }
  logout() {
    this.resetSecurityObject();
    // remove user from local storage to log user out
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.token = "";
    this.securityObject.isAuthenticated = false;
    this.securityObject.userRole = "other";
    this.securityObject.accessLevel = "read";

    this.securityObject.canAccessInventory = false;
    this.securityObject.canAccessAssets = false;
    this.securityObject.canAccessNotifications = false;
    this.securityObject.canSaveInventory = false;
    this.securityObject.canSaveAssets = false;
    this.securityObject.canSaveNotifications = false;

    localStorage.removeItem("token");
  }
}

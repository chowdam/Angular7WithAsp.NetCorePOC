import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
export class VinSearchResult {
  Vin: string;
}
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

export class VehicleInfoVM {
  vin: string;
}

@Injectable({
  providedIn: "root"
})
export class SearchService {
  clientID = "Add you spotifi api cient ID";
  // baseUrl = "http://localhost:5000/api/vehicle/";
  baseUrl =
    "https://oamasvc.azurewebsites.net/api/LookUpData/GetVehicleInfoByVIN";

  constructor(private http: HttpClient) {}

  private inventoryUrl = environment.baseUrl + "/api/inventory";

  search(queryString: string) {
    const url = this.baseUrl + queryString;
    return this.http.get<VinSearchResult[]>(url).pipe(
      tap(data => console.log("getAsset: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getVehicleInfoByVIN(vin: string) {
    const vinObj = new VehicleInfoVM();
    vinObj.vin = vin;

    return this.http
      .post<any>(this.baseUrl, JSON.stringify(vinObj), httpOptions)
      .pipe(
        tap(data =>
          console.log("getVehicleInfoByVIN: " + JSON.stringify(data))
        ),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    console.log(err);
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    // if (err.error && err.error instanceof ErrorEvent) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   errorMessage = `An error occurred: ${err.error.message}`;
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong,
    //   errorMessage = `Backend returned code ${err.status}: ${err.body?.error}`;
    // }
    console.error(err);
    return throwError(err);
  }
}

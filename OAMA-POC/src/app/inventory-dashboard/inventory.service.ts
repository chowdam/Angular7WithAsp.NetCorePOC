import { Injectable } from "@angular/core";
import { throwError, Observable, of } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpEvent,
  HttpEventType
} from "@angular/common/http";
import { Inventory } from "./inventory";
import { tap, catchError } from "rxjs/operators";
import { Asset } from "./asset";
import { environment } from "src/environments/environment";
import { DateFloatingFilterComp } from "ag-grid-community/dist/lib/filter/floatingFilter";
import { AssetVM } from "./AssetVM";

@Injectable({
  providedIn: "root"
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  private inventoryUrl = environment.baseUrl + "/api/inventory";

  getInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.inventoryUrl).pipe(
      tap(data => console.log("Get Inventory data called from service ")),
      catchError(this.handleError)
    );
  }

  getAllInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.inventoryUrl + "/getall").pipe(
      tap(data => console.log("Get Inventory data called from service ")),
      catchError(this.handleError)
    );
  }

  getInventoryByPage(
    pageSize: number,
    currPage: number
  ): Observable<Inventory[]> {
    const ps = pageSize.toString();
    const pi = currPage.toString();
    console.log("pageSize, currPage " + ps + " - " + pi);
    const params = new HttpParams().set("pageSize", ps).set("currPage", pi); // Create new HttpParams
    console.log("params: " + JSON.stringify(params));
    return this.http
      .get<Inventory[]>(this.inventoryUrl + "/get", { params: params })
      .pipe(
        tap(data =>
          console.log("Get Inventory data by pagesize called from service ")
        ),
        catchError(this.handleError)
      );
  }

  getAsset(id: string): Observable<AssetVM> {
    if (id === "") {
      return of(this.initializeAsset());
    }
    const url = `${this.inventoryUrl}/${id}`;
    return this.http.get<AssetVM>(url).pipe(
      tap(data => console.log("getAsset: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getData() {
    const req = new HttpRequest("GET", this.inventoryUrl, {
      reportProgress: true
    });

    this.http.request(req).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log("Request sent!");
          break;
        case HttpEventType.ResponseHeader:
          console.log("Response header received!");
          break;
        case HttpEventType.DownloadProgress:
          const kbLoaded = Math.round(event.loaded / 1024);
          console.log(`Download in progress! ${kbLoaded}Kb loaded`);
          break;
        case HttpEventType.Response:
          console.log("😺 Done!", event.body);
      }
    });
  }

  private handleError(err) {
    console.log(err);
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    // if (err.error instanceof ErrorEvent) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   errorMessage = `An error occurred: ${err.error.message}`;
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong,
    //   errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    // }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeAsset(): AssetVM {
    // Return an initialized object
    return {
      serialNumber: "",
      ttnmAccount: "",
      ttnmGroup: "",
      softwareType: "",
      assetAge: 0,
      assetUseTime: 0,
      acquiredDate: new Date(),
      retiredDate: new Date(),
      assetNotes: "",

      assetStatus: "",
      assetPossession: "",
      associationStatus: "",
      associationStartDate: new Date(),
      associationEndDate: new Date(),

      vin: "",
      modelYear: "",
      vehicleAge: "",
      vehicleType: "",
      vehicleStatus: "",
      busNumber: "",
      licensePlate: "",
      garage: "",
      sbcCode: "",
      sbcName: "",
      vehicleOwner: ""
    };
  }
}

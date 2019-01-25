import { AssetFormComponent } from "./core/asset-form/asset-form.component";
import { LoginComponent } from "./core/login/login.component";
import { ContactComponent } from "./core/contact/contact.component";
import { AboutComponent } from "./core/about/about.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./core/page-not-found/page-not-found.component";
import { HomeComponent } from "./core/home/home.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "assetfrm", component: AssetFormComponent },
  { path: "login", component: LoginComponent },
  {
    path: "admin",
    loadChildren:
      "./admin-dashboard/admin-dashboard.module#AdminDashboardModule"
  },
  {
    path: "inventory",
    loadChildren:
      "./inventory-dashboard/inventory-dashboard.module#InventoryDashboardModule"
  },
  {
    path: "notifications",
    loadChildren:
      "./notifications-dashboard/notifications-dashboard.module#NotificationsDashboardModule"
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

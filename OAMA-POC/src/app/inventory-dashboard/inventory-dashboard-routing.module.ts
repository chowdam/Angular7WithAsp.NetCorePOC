import { AuthGuard } from "./../_security/auth.guard";
import { AssetResolverService } from "./asset-resolver.service";
import { AssetDetailComponent } from "./asset-detail/asset-detail.component";
import { InventoryListComponent } from "./inventory-list/inventory-list.component";
import { InventoryPrimengComponent } from "./inventory-primeng/inventory-primeng.component";
import { InventoryAgGridComponent } from "./inventory-ag-grid/inventory-ag-grid.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InventoryResolverService } from "./inventory-resolver.service";

const routes: Routes = [
  {
    path: "inventory",
    component: InventoryListComponent,
    canActivate: [AuthGuard],
    resolve: { inventory: InventoryResolverService }
  },
  {
    path: "primeng",
    component: InventoryPrimengComponent,
    canActivate: [AuthGuard],
    resolve: { inventory: InventoryResolverService }
  },
  {
    path: "aggrid",
    component: InventoryAgGridComponent,
    canActivate: [AuthGuard],
    resolve: { inventory: InventoryResolverService }
  },
  {
    path: "asset/:id",
    component: AssetDetailComponent,
    canActivate: [AuthGuard],
    resolve: { assetmodel: AssetResolverService }
  },
  { path: "", redirectTo: "/inventory", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryDashboardRoutingModule {}

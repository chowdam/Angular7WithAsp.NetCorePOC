import { Inventory } from './../inventory';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
  pageTitle = 'Inventory';
  filteredInventory: Inventory[] = [];
  inventory: Inventory[] = [];
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    // this.filteredInventory = this.listFilter   ? this.performFilter(this.listFilter)   : this.inventory;

    if (this.listFilter) {
      this.filteredInventory = this.performFilter(this.listFilter);
      console.log('Filtered Results: ' + this.filteredInventory);
    } else {
      this.filteredInventory = this.inventory;
    }
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log('retrieving from route data for inventory');
    // console.log('data:' + this.route.snapshot.data['inventory']);
    this.inventory = <Inventory[]>this.route.snapshot.data['inventory'];
    if (this.listFilter) {
      this.filteredInventory = this.performFilter(this.listFilter);
    } else {
      this.filteredInventory = this.inventory;
    }
  }

  performFilter(filterBy: string): Inventory[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.inventory.filter(
      (inventory: Inventory) =>
        inventory.SerialNumber.toLocaleLowerCase().indexOf(filterBy) > -1
    );
  }
}

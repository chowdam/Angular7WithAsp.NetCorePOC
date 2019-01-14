import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  routeParams;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.routeParams = this.activatedRoute.snapshot.queryParams;
  }
}

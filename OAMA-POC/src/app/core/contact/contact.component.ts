import { Component, OnInit } from "@angular/core";
import { LoggingService } from "src/app/_logging/logging.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {
  constructor(private logger: LoggingService) {
    this.logger.log("Welcome Contact!");
  }

  ngOnInit() {}
}

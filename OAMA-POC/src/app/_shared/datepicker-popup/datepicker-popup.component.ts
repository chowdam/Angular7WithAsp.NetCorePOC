import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "datepicker-popup",
  templateUrl: "./datepicker-popup.component.html",
  styleUrls: ["./datepicker-popup.component.css"]
})
export class DatepickerPopupComponent implements OnInit {
  model = { year: 2015, month: 6, day: 1 };
  calForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.calForm = this.fb.group({
      cal: [null, null]
    });

    this.calForm.controls["cal"].valueChanges.subscribe(data => {
      if (!data || (typeof data === "string" && data.length === 0)) {
        this.calForm.patchValue(
          {
            cal: null
          },
          { emitEvent: false }
        );
      }
    });
  }

  clear() {
    this.calForm.patchValue({
      cal: null
    });
  }
}

import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef
} from "@angular/core";
import { BaseService } from "../base.service";
import { ActivatedRoute, Router } from "@angular/router";
declare var $: any;

@Component({
  selector: "app-actions",
  templateUrl: "./actions.component.html"
})
export class ActionsComponent implements OnInit {
  @Input() actions;
  @Output() actionCompleted = new EventEmitter();
  formData: any = {};
  formValues: any = {};
  fields: any = [];
  formId: any;

  constructor(
    private baseService: BaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    $("#formActionModal").on("hide.bs.modal", () => {
      this.resetFormValues();
    });
  }

  openForm(action) {
    let actionUrl = "/action/" + action.identifier;
    this.formId = action.identifier;
    this.baseService.get(actionUrl).subscribe((res) => {
      this.setFields(res);
      this.openActionModal();
    });
  }

  setFields(result) {
    this.formData = Object.assign({}, result);
    this.fields = this.formData["fields"];
  }

  openActionModal() {
    $("#formActionModal").modal("show");
  }

  closeActionModal() {
    console.log("id is .. ", this.formId);
    console.log(" fiels is ", this.fields);
    $("#formActionModal").modal("hide");
    this.resetFormValues();
  }

  resetFormValues() {
    this.formId = null;
    this.formData = {};
    this.formValues = {};
    this.fields = [];
  }

  updateVal(value, field, idx) {
    if (field.key) {
      this.formValues[field.key] = value;
    }
    console.log("this.formvalues is ... ", this.formValues);
  }

  saveForm() {
    let data = Object.assign({}, this.formValues);
    let actionUrl = "/action-save/" + this.formId;
    let formValues = { identifier: this.formId, values: data };
    this.baseService.post(formValues, actionUrl).subscribe((res) => {
      // this.result = res; // todo handle error : validation
      // this._notifier("success", res.message);
      if (res["actionCompleted"]) {
        this.actionCompleted.emit({ reload: true });
        this.closeActionModal();
      }
      if (!res["actionCompleted"]) {
        console.log("error while saving form happend ", res);
      }
    });
  }
}

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
  selector: "app-inline-actions",
  templateUrl: "./inline-actions.component.html"
})
export class InlineActionsComponent implements OnInit {
  @Input() action;
  @Input() recordId;
  @Output() actionCompleted = new EventEmitter();
  formData: any = {};
  formValues: any = {};
  fields: any = [];
  formId: any;
  errorMessage: any;

  _isFormOpen = false;
  @Input()
  get isFormOpen() {
    return this._isFormOpen;
  }
  set isFormOpen(val) {
    this._isFormOpen = val;
    if (val && this.action && this.action.identifier) {
      this.openForm();
    }
  }

  constructor(
    private baseService: BaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    $("#inlineFormActionModal").on("hide.bs.modal", () => {
      this.resetFormValues();
    });
  }

  openForm() {
    let actionUrl = "/action/" + this.action.identifier;
    let params = {};
    if (this.recordId) {
      params["id"] = this.recordId;
    }
    this.formId = this.action.identifier;
    this.baseService.get(actionUrl, params).subscribe((res) => {
      this.setFields(res);
      this.openActionModal();
    });
  }

  setFields(result) {
    this.formData = Object.assign({}, result);
    this.fields = this.formData["fields"];
    let values = this.formData.values || {};
    for (let f of this.fields) {
      if (values[f.key]) {
        f.value = values[f.key];
      }
    }
  }

  openActionModal() {
    $("#inlineFormActionModal").modal("show");
  }

  closeActionModal() {
    $("#inlineFormActionModal").modal("hide");
    this.resetFormValues();
    this.actionCompleted.emit({ reload: true });
  }

  resetFormValues() {
    this.formId = null;
    this.formData = {};
    this.formValues = {};
    this.fields = [];
    this.errorMessage = null;
  }

  updateVal(value, field, idx) {
    if (field.key) {
      this.formValues[field.key] = value;
    }
  }

  saveForm() {
    let data = Object.assign({}, this.formValues);
    let actionUrl = "/action-save/" + this.formId;
    let formValues = {
      identifier: this.formId,
      values: data,
      _id: this.recordId
    };
    this.baseService.post(formValues, actionUrl).subscribe((res) => {
      if (res["actionCompleted"]) {
        this.actionCompleted.emit({ reload: true });
        this.closeActionModal();
      }
      if (!res["actionCompleted"]) {
        this.errorMessage = res["error"];
      }
    });
  }
}

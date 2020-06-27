import { Component, OnInit } from "@angular/core";
import { BaseService } from "../base.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-workflow",
  templateUrl: "./workflow.component.html"
})
export class WorkflowComponent implements OnInit {
  workflow: String;
  workflowData: Object = {};
  currentInlineAction: any = {};
  recordId: String;
  isFormOpen: Boolean = false;
  displayItems: any = [];
  inline_action: any = [];
  top_action: any = [];
  displayFields: any = [];
  error: any;

  constructor(
    private baseService: BaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params && params.wf) {
        this.workflow = params.wf;
      }
      this.loadWorkflow();
    });
  }

  resetWorkflow() {
    this.workflow = "";
    this.workflowData = {};
    this.displayItems = [];
    this.displayFields = [];
    this.inline_action = [];
    this.top_action = [];
    this.error = null;
  }

  loadWorkflow() {
    let uri = "/wrk/" + this.workflow;
    this.baseService.get(uri).subscribe((res) => {
      if (res["error"]) {
        this.error = res["error"];
      }
      this.workflowData = res;
      this.displayItems = res["items"];
      this.displayFields = res["display"];
      this.inline_action = res["inline_action"] || [];
      this.top_action = res["top_action"] || [];
    });
  }

  onActionComplete(event) {
    this.loadWorkflow();
    this.resetInlineAction();
  }

  resetInlineAction() {
    this.currentInlineAction = {};
    this.isFormOpen = false;
    this.recordId = null;
  }

  openForm(action, id) {
    this.currentInlineAction = action;
    this.recordId = id;
    this.isFormOpen = true;
  }
}

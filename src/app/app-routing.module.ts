import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { WorkflowComponent } from "./workflow/workflow.component";

const routes: Routes = [
  { path: "admin-login", component: AdminLoginComponent },
  { path: "user-login", component: UserLoginComponent },
  { path: "wrk/:wf", component: WorkflowComponent },
  { path: "wrk/", component: WorkflowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

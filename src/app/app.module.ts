import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { WorkflowComponent } from "./workflow/workflow.component";
import { ActionsComponent } from "./actions/actions.component";
import { NavsComponent } from "./navs/navs.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { InlineActionsComponent } from './inline-actions/inline-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    UserLoginComponent,
    WorkflowComponent,
    ActionsComponent,
    NavsComponent,
    InlineActionsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

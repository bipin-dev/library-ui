import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BaseService } from "../base.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  providers: [BaseService]
})
export class AdminLoginComponent implements OnInit {
  updatedValues: any = {};
  isLoggedIn: Boolean = false;
  isError: Boolean = false;
  errorMessage: String = "";

  @Output("userLoggedIn") userLoggedIn = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private baseService: BaseService
  ) {}

  ngOnInit() {}

  updateFormValues(value, key) {
    if (this.isError) {
      this.removeError();
    }
    this.updatedValues[key] = value;
  }

  routeWorkflow() {
    this.router.navigate(["wrk/book_admin"]);
  }

  goUserLoginPage() {
    this.router.navigate(["/user-login"]);
  }

  doLogin() {
    this.updatedValues["type"] = "admin";
    this.removeError();
    this.baseService.adminLogin(this.updatedValues).subscribe((res: any) => {
      if (res.authenticated) {
        this.isLoggedIn = true;
        if (res.token) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user_logged", "false");
          localStorage.setItem("admin_logged", "true");
        }
        if (res.user) {
          localStorage.setItem("user", JSON.stringify(res.user));
          this.routeWorkflow();
        }
        // this.userLoggedIn.emit(true)
      }
      if (!res.authenticated) {
        this.showError();
      }
    });
  }

  removeError() {
    this.isError = false;
    this.errorMessage = "";
  }

  showError() {
    this.isError = true;
    this.errorMessage = "invalid credential";
  }
}

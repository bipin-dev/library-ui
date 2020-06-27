import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { BaseService } from "../base.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"],
  providers: [BaseService],
})
export class UserLoginComponent implements OnInit {
  updatedValues: any = {};
  isUserLoggedIn: Boolean = false;
  errorMessage: String = "";
  isError: Boolean = false;
  @Output("userLoggedIn") userLoggedIn = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private baseService: BaseService
  ) {}

  ngOnInit() {}

  updateFormValues(value, key) {
    this.updatedValues[key] = value;
    console.log("updated values is .. ", this.updatedValues);
  }

  routeWorkflow() {
    this.router.navigate(["wrk/book_user"]);
  }

  doLogin() {
    this.updatedValues["type"] = "user";
    this.removeError();
    this.baseService.userLogin(this.updatedValues).subscribe((res: any) => {
      console.log("response from the server is recieved : ", res);
      if (res.authenticated) {
        this.isUserLoggedIn = true;
        console.log(res);
        if (res.token) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user_logged", "true");
          localStorage.setItem("admin_logged", "false");
        }
        if (res.user) {
          localStorage.setItem("user_details", JSON.stringify(res.user));
        }
        this.routeWorkflow();
        this.userLoggedIn.emit(true);
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

import { Component } from "@angular/core";
import { BaseService } from "./base.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    private baseService: BaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.routeToCurrent();
  }

  routeToCurrent() {
    let url = "/admin-login";
    let isUser = this.isUserLoggedIn();
    if (localStorage.getItem("token")) {
      url = isUser ? "/wrk/book_user" : "/wrk/book_admin";
    }
    if (!localStorage.getItem("token")) {
      url = isUser ? "/user-login" : url;
    }
    this.router.navigate([url]);
  }

  isUserLoggedIn() {
    let flag = localStorage.getItem("user_logged");
    return flag == "true" || flag === "true";
  }
}

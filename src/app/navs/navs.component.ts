import { Component, OnInit } from "@angular/core";
import { BaseService } from "../base.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-navs",
  templateUrl: "./navs.component.html",
})
export class NavsComponent implements OnInit {
  navs: any = [];
  constructor(
    private baseService: BaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadNavs();
  }

  loadNavs() {
    let uri = "/navs";
    this.baseService.get(uri).subscribe((res) => {
      this.navs = res;
      console.log("navs is ... ", this.navs);
    });
  }

  doLogout() {
    if (confirm("Do you want to logout")) {
      this.baseService.logout("/logout").subscribe((res) => {
        console.log("logging out... ", res);
        if (res["status"] == "logged_out") {
          this.removeCache();
        }
      });
    }
  }

  removeCache() {
    let isUser = this.isUserLoggedIn();
    console.log("is user is ... ", isUser);
    this.baseService.removeCache();
    if (isUser) {
      this.routeToLogin("/user-login");
    } else {
      this.routeToLogin("/admin-login");
    }
  }

  routeToLogin(url) {
    this.router.navigate([url]);
  }

  isUserLoggedIn() {
    let flag = localStorage.getItem("user_logged");
    console.log(typeof flag);
    console.log("flag is : ", flag);
    return flag == "true" || flag === "true";
  }
}

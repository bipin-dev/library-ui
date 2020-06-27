import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

const SERVER: string = environment.server;
@Injectable({
  providedIn: "root"
})
export class BaseService {
  constructor(private http: HttpClient) {}

  post(data, url) {
    console.log(`inside base service ${localStorage.getItem("token")}`);
    let headerOptions = this.getheaderOptions();
    let req_url = SERVER + url;
    console.log("requesting url is ", req_url);
    return this.http.post<any>(req_url, data, headerOptions);
  }

  get(url, params = {}) {
    let req_url = SERVER + url;
    let headerOptions = this.getheaderOptions();
    headerOptions["params"] = params;
    console.log("requesting url is : ", req_url);
    return this.http.get(req_url, headerOptions);
  }

  getWithParams(url, params) {
    let req_url = SERVER + url;
    let headerOptions = this.getheaderOptions();
    headerOptions["params"] = params;
    console.log("requesting url is : ", req_url);
    return this.http.get(req_url, headerOptions);
  }

  adminLogin(data) {
    let headerOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    let req_url = SERVER + "/admin-login";
    return this.http.post<any>(req_url, data, headerOptions);
  }

  userLogin(data) {
    let headerOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    let req_url = SERVER + "/user-login";
    return this.http.post<any>(req_url, data, headerOptions);
  }

  getheaderOptions() {
    let headerOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      })
    };
    return headerOptions;
  }

  logout(url) {
    let req_url = SERVER + url;
    let headerOptions = this.getheaderOptions();
    console.log("requesting url is : ", req_url);
    return this.http.get(req_url, headerOptions);
  }

  removeCache() {
    let keys = ["token", "user_logged", "admin_logged", "user", "user_details"];
    for (let key of keys) {
      localStorage.removeItem(key);
    }
    return;
  }
}

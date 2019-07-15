import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/mergeMap'
import { StorageService } from "../localstorage/storage";
import { AlertController } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    url: string = "http://182.75.23.84:8004";
    constructor(public http: HttpClient, public localStorage: StorageService, public alertCtrl: AlertController,
        private translate: TranslateService) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem("ngStorage-token");

        if (token) {
            req = req.clone({
                setHeaders: {
                    "Authorization":
                        "Bearer " + this.localStorage.getData("ngStorage-token"),
                    "imei": this.localStorage.getData("IMEI")
                }
            });
        }

        return next.handle(req).catch(err => {
            if (err.status === 401) {
                if (err.error.message.includes("Expired")) {
                    return this.http.get(this.url + "/" + 'RefreshToken').flatMap(
                        (data: any) => {
                            //If reload successful update tokens
                            //Update tokens
                            this.localStorage.storeData("ngStorage-token", data.Token);
                            // localStorage.setItem("refreshToken", data.result.refreshToken);
                            //Clone our fieled request ant try to resend it
                            req = req.clone({
                                setHeaders: {
                                    "Authorization":
                                        "Bearer " + data.Token,
                                    "imei": this.localStorage.getData("IMEI")
                                }
                            });
                            return next.handle(req).catch((err: any) => {
                                //Catch another error
                                return err;
                            });
                        });
                } else {
                    //Logout from account or do some other stuff
                }
            } else if (err.status) {
                this.showError(err.error.message || this.translate.instant("Something went wrong"));
            }
            return Observable.throw(err);
        });


    }
    handleError = (errorResponse: HttpErrorResponse) => {
        debugger
        if (errorResponse.status !== 401 && !errorResponse.error.message.include("Expired")) {
            this.showError(errorResponse.error.message || this.translate.instant("Something went wrong"));
        }
        // this.events.publish("user:logout");
        // if (errorResponse.status)
        return Observable.throw(errorResponse);
    };

    showError(message) {
        const alert = this.alertCtrl.create({
            title: this.translate.instant("Error"),
            subTitle: this.translate.instant(message),
            buttons: ["OK"]
        });
        alert.present();
    }
}
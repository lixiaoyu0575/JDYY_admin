"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by th3ee on 6/5/17.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var LoginService = (function () {
    function LoginService(http) {
        this.http = http;
        this.url = 'http://59.110.52.133:3333/authenticate';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.emailheaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.isLoggedIn = false;
    }
    LoginService.prototype.handleError = function (error) {
        console.error('An error occured', error);
        return Promise.reject(error.message || error); // ?
    };
    LoginService.prototype.authenticate = function (values) {
        var _this = this;
        return this.http.post(this.url, values, { headers: this.emailheaders }).toPromise().then(function (res) {
            console.log(res.json());
            _this.isLoggedIn = true;
            _this.userLevel = res.json().userlevel;
            console.log(_this.userLevel);
            return res.json();
        });
    };
    LoginService.prototype.getuser = function () {
        return this.http.get('http://59.110.52.133:3333/getusers').toPromise().then(function (res) { return res.json(); });
    };
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable()
], LoginService);
exports.LoginService = LoginService;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by th3ee on 5/17/17.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var HeroService = (function () {
    function HeroService(http) {
        this.http = http;
        this.heroesUrl = 'api/heroes';
        this.localUrl = 'http://59.110.52.133:3333/';
        this.emailUrl = 'http://59.110.52.133:3333/sendmail';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.emailheaders = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    HeroService.prototype.getHeroes = function () {
        return this.http.get(this.localUrl + 'gethero')
            .toPromise().then(function (response) { return response.json(); });
    };
    HeroService.prototype.handleError = function (error) {
        console.error('An error occured', error);
        return Promise.reject(error.message || error); // ?
    };
    HeroService.prototype.deleteHero = function (name) {
        return this.http.post(this.localUrl + 'deletehero', JSON.stringify({
            name: name,
        }), { headers: this.headers })
            .toPromise().then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    HeroService.prototype.getHero = function (id) {
        return this.http.post(this.localUrl + 'getherodetail', JSON.stringify({
            id: id,
        }), { headers: this.headers })
            .toPromise().then(function (response) {
            console.log(response.json());
            return response.json();
        })
            .catch(this.handleError);
    };
    HeroService.prototype.update = function (hero) {
        return this.http.post(this.localUrl + 'updatehero', JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(function () { return hero; })
            .catch(this.handleError);
    };
    HeroService.prototype.createReport = function (report) {
        return this.http.post(this.localUrl + 'addreport', JSON.stringify(report), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    HeroService.prototype.getReport = function () {
        return this.http.get(this.localUrl + 'getallreport')
            .toPromise()
            .then(function (res) {
            console.log(res.json());
            return res.json();
        })
            .catch(this.handleError);
    };
    HeroService.prototype.create = function (id, name, age, scantype, reason, originaldiagnosis, status, time, user) {
        return this.http.post(this.localUrl + 'addhero', JSON.stringify({
            id: id,
            name: name,
            age: age,
            scantype: scantype,
            reason: reason,
            originaldiagnosis: originaldiagnosis,
            status: status,
            time: time,
            user: user,
        }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    HeroService.prototype.sendMail = function (usercreds) {
        var emailid = 'name=' + usercreds.recipients + '&text=' + usercreds.message + '&title=' + usercreds.subject;
        console.log(emailid);
        this.http.post(this.localUrl + 'sendmail', usercreds, { headers: this.emailheaders }).toPromise()
            .then(function (res) {
            res.json();
            console.log(res.status);
        });
    };
    HeroService.prototype.getAllItems = function () {
        return this.http.get(this.localUrl + 'getallitems')
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    HeroService.prototype.getItem = function (ID) {
        return this.http.post(this.localUrl + 'getitem', JSON.stringify({ ID: ID }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    return HeroService;
}());
HeroService = __decorate([
    core_1.Injectable()
], HeroService);
exports.HeroService = HeroService;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by th3ee on 5/19/17.
 */
var core_1 = require("@angular/core");
var ng2_smart_table_1 = require("ng2-smart-table");
var SendApplyComponent = (function () {
    function SendApplyComponent(router, route, heroService, loginService, location) {
        this.router = router;
        this.route = route;
        this.heroService = heroService;
        this.loginService = loginService;
        this.location = location;
        this.currentUrl = 'http://localhost:4200';
        this.emailContent = {
            recipients: '',
            subject: '您有一份阅片诊断申请',
            message: '',
        };
        this.source = new ng2_smart_table_1.LocalDataSource();
    }
    SendApplyComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService.getHeroes().then(function (heroes) { return _this.heroes = heroes; });
    };
    SendApplyComponent.prototype.getUser = function () {
        var _this = this;
        this.loginService.getuser().then(function (data) {
            // this.source.load(data);
            // console.log(data);
            _this.users = data;
            _this.nowuser = localStorage['user_name'];
            // console.log(this.users);
            _this.applyTo = data[1].name;
        });
    };
    SendApplyComponent.prototype.ngOnInit = function () {
        this.getHeroes();
        this.getUser();
    };
    SendApplyComponent.prototype.gotoHeroes = function () {
        this.router.navigate(['../'], { relativeTo: this.route }); // !
    };
    SendApplyComponent.prototype.goBack = function () {
        this.location.back(); // !
    };
    SendApplyComponent.prototype.add = function (name, age, scantype, reason, originaldiagnosis, status, time, user) {
        var _this = this;
        var date = new Date();
        name = name.trim();
        age = age.trim();
        scantype = scantype.trim();
        reason = reason.trim();
        originaldiagnosis = originaldiagnosis.trim();
        status = '未审核';
        time = date.toDateString();
        user = [this.applyTo];
        if (!name) {
            return;
        }
        this.heroService.create(name, age, scantype, reason, originaldiagnosis, status, time, user).then(function (hero) {
            console.log(hero);
            _this.heroes.push(hero);
            _this.selectedHero = null;
        });
    };
    SendApplyComponent.prototype.sendMail = function () {
        this.emailContent.recipients = 'th3eepop@163.com';
        this.emailContent.message = '' + this.nowuser.name + '发来了报告诊断申请,点击' + this.currentUrl + '查看';
        console.log(this.emailContent);
        this.heroService.sendMail(this.emailContent);
    };
    return SendApplyComponent;
}());
SendApplyComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'add-hero',
        templateUrl: './sendapp.component.html',
    })
], SendApplyComponent);
exports.SendApplyComponent = SendApplyComponent;

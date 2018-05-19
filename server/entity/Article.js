"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Category_1 = require("./Category");
let Article = class Article {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Article.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Article.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Article.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ type: 'tinyint' }),
    __metadata("design:type", Number)
], Article.prototype, "status", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Article.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Article.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_1.User, user => user.articles),
    __metadata("design:type", User_1.User)
], Article.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Category_1.Category, category => category.articles),
    __metadata("design:type", Category_1.Category)
], Article.prototype, "category", void 0);
Article = __decorate([
    typeorm_1.Entity()
], Article);
exports.Article = Article;

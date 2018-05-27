"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Article_1 = require("../entity/Article");
const articleRepository = typeorm_1.getManager().getRepository(Article_1.Article);
class ArticleService {
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return articleRepository.findOne({ id });
        });
    }
    getBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            return articleRepository.findOne({ slug });
        });
    }
    getAll(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return articleRepository.find();
        });
    }
    getByWhere(whereCondition) {
        return __awaiter(this, void 0, void 0, function* () {
            return articleRepository.find(whereCondition);
        });
    }
    removeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return articleRepository.delete(id);
        });
    }
    newAndSave(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const newArticle = articleRepository.create(body);
            return articleRepository.save(newArticle);
        });
    }
}
module.exports = ArticleService;

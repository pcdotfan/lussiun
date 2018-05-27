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
function index(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield context.service.category.getAll();
        context.body = categories;
    });
}
exports.index = index;
function show(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield context.service.category.getById(context.params.id);
        console.log(category.articles);
        context.body = category;
    });
}
exports.show = show;
function destroy(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = context.request; // 拿到传入的参数
        try {
            if (!body.id) {
                context.status = 400;
                context.body = { error: `无效的传入参数` };
                return;
            }
            const categoryExisted = yield context.service.category.getById(body.id);
            if (categoryExisted) {
                yield context.service.category.removeById(body.id);
            }
            context.status = 200;
        }
        catch (error) {
            context.status = 500;
            context.body = { error: error };
        }
    });
}
exports.destroy = destroy;
function store(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = context.request; // 拿到传入的参数
        try {
            if (!body.name || !body.slug) {
                context.status = 400;
                context.body = { error: `无效的传入参数` };
                return;
            }
            const categoryExisted = yield context.service.category.getBySlug(body.slug);
            if (!categoryExisted) {
                const newCategory = yield context.service.category.newAndSave(body);
                context.status = 200;
                context.body = { message: '创建成功', newCategory };
            }
            else {
                context.status = 406;
                context.body = { message: '同别名分类目录已经存在' };
            }
        }
        catch (error) {
            context.status = 500;
            context.body = { error: error };
        }
    });
}
exports.store = store;

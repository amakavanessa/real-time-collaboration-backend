"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentService = void 0;
const sequelize_1 = require("sequelize");
const document_model_1 = require("../db/models/document.model");
const document_user_model_1 = require("../db/models/document-user.model");
class DocumentService {
    constructor() {
        this.findDocumentById = (id, userId) => __awaiter(this, void 0, void 0, function* () {
            let document = yield document_model_1.Document.findOne({
                where: {
                    [sequelize_1.Op.or]: [
                        {
                            id: id,
                            userId: userId,
                        },
                        {
                            id: id,
                            isPublic: true,
                        },
                    ],
                },
            });
            if (!document) {
                const sharedDocument = yield document_user_model_1.DocumentUser.findOne({
                    where: {
                        userId: userId,
                        documentId: id,
                    },
                    include: {
                        model: document_model_1.Document,
                    },
                });
                if (!sharedDocument)
                    return null;
                document = sharedDocument.document;
            }
            return document;
        });
        this.findDocumentByToken = (token, userId) => __awaiter(this, void 0, void 0, function* () {
            // Find document by token
            const document = yield document_model_1.Document.findOne({
                where: { token: token },
            });
            const isOwner = (document === null || document === void 0 ? void 0 : document.userId) == userId;
            const hasAccess = yield document_user_model_1.DocumentUser.findOne({
                where: { documentId: document === null || document === void 0 ? void 0 : document.id, userId: userId },
            });
            const isPublic = document === null || document === void 0 ? void 0 : document.isPublic;
            if (!isOwner && !hasAccess && !isPublic)
                return null;
            return document;
        });
    }
}
const documentService = new DocumentService();
exports.documentService = documentService;

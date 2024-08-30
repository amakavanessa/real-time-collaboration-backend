import { Op } from "sequelize";
import { Document } from "../db/models/document.model";
import { DocumentUser } from "../db/models/document-user.model";

class DocumentService {
  public findDocumentById = async (id: number, userId: number) => {
    let document = await Document.findOne({
      where: {
        [Op.or]: [
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
      const sharedDocument = await DocumentUser.findOne({
        where: {
          userId: userId,
          documentId: id,
        },
        include: {
          model: Document,
        },
      });

      if (!sharedDocument) return null;

      document = sharedDocument.document;
    }

    return document;
  };

  public findDocumentByToken = async (token: string, userId: number) => {
    // Find document by token
    const document = await Document.findOne({
      where: { token: token },
    });

    const isOwner = document?.userId == userId;

    const hasAccess = await DocumentUser.findOne({
      where: { documentId: document?.id, userId: userId },
    });

    const isPublic = document?.isPublic;

    if (!isOwner && !hasAccess && !isPublic) return null;

    return document;
  };
}

const documentService = new DocumentService();

export { documentService };

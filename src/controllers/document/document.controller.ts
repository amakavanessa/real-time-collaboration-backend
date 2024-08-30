import { Request, Response } from "express";
import catchAsync from "../../middlewares/catch-async";
import { documentService } from "../../services/document.service";
import { where } from "sequelize";
import { Document } from "../../db/models/document.model";
import { DocumentUser } from "../../db/models/document-user.model";
import { validationResult } from "express-validator";
import crypto from "crypto";

class DocumentController {
  public getOne = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) return res.sendStatus(401);

    const { id } = req.params;

    const document = await documentService.findDocumentById(
      parseInt(id),
      parseInt(req.user.id)
    );

    if (document === null) return res.sendStatus(404);

    return res.status(200).json(document);
  });

  public getAll = catchAsync(async (req: Request, res: Response) => {
    const documents = await Document.findAll({
      where: {
        userId: req.user?.id,
      },
    });
    const documentUsers = await DocumentUser.findAll({
      where: {
        userId: req.user?.id,
      },
      include: {
        model: Document,
      },
    });

    const sharedDocuments = documentUsers.map(
      (documentUser) => documentUser.document
    );

    documents.push(...sharedDocuments);

    return res.status(200).json(documents);
  });

  public update = catchAsync(async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }

    if (!req.user) return res.sendStatus(401);

    const { id } = req.params;

    const { title, content, isPublic } = req.body;

    const document = await documentService.findDocumentById(
      parseInt(id),
      parseInt(req.user.id)
    );

    if (document === null) return res.sendStatus(404);

    if (title !== undefined && title !== null) document.title = title;
    if (content !== undefined && content !== null) document.content = content;
    if (isPublic !== undefined && isPublic !== null)
      document.isPublic = isPublic;

    await document.save();

    return res.sendStatus(200);
  });

  public create = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) return res.sendStatus(401);
    const token = crypto.randomBytes(16).toString("hex");
    const document = await Document.create({
      userId: req.user.id,
      token: token,
    });

    return res.status(201).json(document);
  });

  public delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    await Document.destroy({
      where: {
        id: id,
        userId: req.user?.id,
      },
    });

    return res.sendStatus(200);
  });

  // Access document by token
  public getOneByToken = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) return res.sendStatus(401);
    const { token } = req.params;
    const userId = req.user.id;

    const document = await documentService.findDocumentByToken(
      token,
      parseInt(userId)
    );

    if (!document) {
      return res.status(404).json({ message: "ACcess Denied" });
    }

    return res.status(200).json(document);
  });
}

const documentController = new DocumentController();

export { documentController };

import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import {
  ASSET_TYPE,
  POSITION_SIDE,
  TRADE_SIDE,
  TRADE_STATUS,
} from "../utils/constants.js";
import { prisma } from "../prisma/client.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no trade")) {
          throw new NotFoundError(errorMessages);
        }
        if (
          errorMessages[0].startsWith(
            "You are not authorized to access this trade",
          )
        ) {
          throw new UnauthorizedError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateCreateTradeInput = withValidationErrors([
  body("ticker").trim().notEmpty().withMessage("ticker is required"),
  body("assetType")
    .notEmpty()
    .withMessage("assetType is required")
    .isIn(Object.values(ASSET_TYPE))
    .withMessage("invalid assetType value"),
  body("side")
    .notEmpty()
    .withMessage("side is required")
    .isIn(Object.values(TRADE_SIDE))
    .withMessage("invalid side value"),
  body("positionSide").custom((value) => {
    if (value === undefined || value === null || value === "") {
      throw new Error("call or put is required");
    }
    if (!Object.values(POSITION_SIDE).includes(value)) {
      throw new Error("invalid call or put value");
    }
    return true;
  }),
  body("status")
    .optional()
    .isIn(Object.values(TRADE_STATUS))
    .withMessage("invalid status value"),
  body("entryDate")
    .notEmpty()
    .withMessage("entryDate is required")
    .isISO8601()
    .withMessage("entryDate must be a valid ISO date"),
  body("entryPrice")
    .notEmpty()
    .withMessage("entryPrice is required")
    .isFloat()
    .withMessage("entryPrice must be a number"),
]);

export const validateUpdateTradeInput = withValidationErrors([
  body("assetType")
    .optional()
    .isIn(Object.values(ASSET_TYPE))
    .withMessage("invalid assetType value"),
  body("side")
    .optional()
    .isIn(Object.values(TRADE_SIDE))
    .withMessage("invalid side value"),
  body("positionSide")
    .optional({ nullable: true })
    .custom((value) => {
      if (value === undefined || value === null || value === "") return true;
      if (!Object.values(POSITION_SIDE).includes(value)) {
        throw new Error("invalid call or put value");
      }
      return true;
    }),
  body("status")
    .optional()
    .isIn(Object.values(TRADE_STATUS))
    .withMessage("invalid status value"),
  body("entryDate")
    .optional()
    .isISO8601()
    .withMessage("entryDate must be a valid ISO date"),
  body("exitDate")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage("exitDate must be a valid ISO date"),
  body("expiration")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage("expiration must be a valid ISO date"),
  body("entryPrice")
    .optional()
    .isFloat()
    .withMessage("entryPrice must be a number"),
  body("exitPrice")
    .optional({ nullable: true, checkFalsy: true })
    .isFloat()
    .withMessage("exitPrice must be a number"),
  body("contracts")
    .optional({ nullable: true, checkFalsy: true })
    .isInt()
    .withMessage("contracts must be an integer"),
  body("quantity")
    .optional({ nullable: true, checkFalsy: true })
    .isFloat()
    .withMessage("quantity must be a number"),
  body("notes")
    .optional({ nullable: true })
    .isString()
    .withMessage("notes must be text")
    .isLength({ max: 100_000 })
    .withMessage("notes are too long"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    // Prisma Trade IDs are CUIDs by schema default.
    const isValidCuid = /^c[a-z0-9]{24}$/.test(value);
    if (!isValidCuid) throw new BadRequestError("invalid trade id");

    const trade = await prisma.trade.findUnique({ where: { id: value } });
    if (!trade) throw new NotFoundError(`no trade with id : ${value}`);
    const isOwner = trade.userId === req.user.userId;
    if (!isOwner)
      throw new UnauthorizedError(
        "You are not authorized to access this trade",
      );
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").trim().notEmpty().withMessage("name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (value) => {
      const user = await prisma.user.findUnique({ where: { email: value } });
      if (user) throw new BadRequestError("email already in use");
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),
  body("password").trim().notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").trim().notEmpty().withMessage("name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email, { req }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user && user.id.toString() !== req.user.userId)
        throw new BadRequestError("email already in use");
    }),
]);

import express from "express";
import { body, param, query } from "express-validator";
import {
  createLead,
  deleteLead,
  getLeads,
  updateLead
} from "../controllers/leadController.js";
import protect from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import { LEAD_STATUSES } from "../models/Lead.js";

const router = express.Router();

const leadBodyValidation = [
  body("name").trim().notEmpty().withMessage("Lead name is required"),
  body("email").isEmail().withMessage("Please enter a valid email").normalizeEmail(),
  body("phone").trim().notEmpty().withMessage("Phone number is required"),
  body("status")
    .optional()
    .isIn(LEAD_STATUSES)
    .withMessage(`Status must be one of: ${LEAD_STATUSES.join(", ")}`)
];

const mongoIdValidation = [
  param("id").isMongoId().withMessage("Invalid lead ID")
];

router.use(protect);

router
  .route("/")
  .get(
    [
      query("status")
        .optional()
        .isIn(LEAD_STATUSES)
        .withMessage(`Status must be one of: ${LEAD_STATUSES.join(", ")}`)
    ],
    validateRequest,
    getLeads
  )
  .post(leadBodyValidation, validateRequest, createLead);

router
  .route("/:id")
  .put([...mongoIdValidation, ...leadBodyValidation], validateRequest, updateLead)
  .delete(mongoIdValidation, validateRequest, deleteLead);

export default router;

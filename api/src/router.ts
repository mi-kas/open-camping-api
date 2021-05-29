import { Router, Request, Response } from "express";
import { findNearby, findById } from "./controllers/camping";

export const router = Router();

router.get("/health", (_req: Request, res: Response) =>
  res.json({ status: "alive" })
);

router.get("/campings", findNearby);
router.get("/campings/:id", findById);

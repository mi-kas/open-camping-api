import { Router, Request, Response } from "express";
import { findNearby } from "./controllers/camping";

export const router = Router();

router.get("/health", (_req: Request, res: Response) =>
  res.json({ status: "Alive" })
);

router.get("/campings", findNearby);

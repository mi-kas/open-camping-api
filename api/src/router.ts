import { Router, Request, Response } from "express";
import { searchCampings, findCampingById } from "./controllers";

export const router = Router();

router.get("/health", (_req: Request, res: Response) =>
  res.json({ status: "alive" })
);

router.post("/campings", searchCampings);
router.get("/campings/:id", findCampingById);

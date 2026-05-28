import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import menuRouter from "./menu";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(menuRouter);

export default router;

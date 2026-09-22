import {Router} from "express";
import serviceRouter from "./service.routers.js";

const router = Router();

router.use("/services", serviceRouter);

export default router;
import express from "express";
import { CustomerSignup } from "../controllers";

const router = express.Router();

/* -------------------------- singup/create user -------------------- */
router.post("/signup", CustomerSignup);

export { router as CustomerRouter };

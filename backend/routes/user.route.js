import express from "express";
import useMiddleware from "../middlewares/user.mid.js";
import {
  login,
  signup,
  logout,
  purchase,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/purchases", useMiddleware, purchase);

export default router;

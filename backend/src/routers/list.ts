import express from "express";
import list from "../controllers/list";
const router = express.Router();

router.get("/all", list.getAllList);
router.put("/create", list.createList);
router.delete("/delete", list.delList);

export default router;

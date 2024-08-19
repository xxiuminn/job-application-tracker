import express from "express";
import list from "../controllers/list";
import checkErrors from "../validators/checkErrors";
import {
  CreateListSchema,
  DelListSchema,
  PatchListSchema,
} from "../validators/list";
import auth from "../middleware/auth";
const router = express.Router();

router.get("/all", auth, list.getAllList);
router.put("/create", auth, checkErrors(CreateListSchema), list.createList);
router.delete("/delete", auth, checkErrors(DelListSchema), list.delList);
router.patch("/update", auth, checkErrors(PatchListSchema), list.patchList);

export default router;

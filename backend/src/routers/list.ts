import express from "express";
import list from "../controllers/list";
import checkErrors from "../validators/checkErrors";
import {
  GetAllListSchema,
  CreateListSchema,
  DelListSchema,
  PatchListSchema,
} from "../validators/list";
const router = express.Router();

router.get("/all", checkErrors(GetAllListSchema), list.getAllList);
router.put("/create", checkErrors(CreateListSchema), list.createList);
router.delete("/delete", checkErrors(DelListSchema), list.delList);
router.patch("/update", checkErrors(PatchListSchema), list.patchList);

export default router;

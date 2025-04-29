import {Router} from "express";
import {createTask, doneTask, getActiveTasks} from "../controllers/taskController.js";

const router = Router();
router.get("/", getActiveTasks);
router.post("/", createTask);
router.patch("/:_id/done", doneTask);


export default router;

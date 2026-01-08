const express = require("express");
const router = express.Router();


const {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask
} = require("../controllers/taskController");


const { deleteComment } = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");
const { taskValidator } = require("../middleware/taskValidator");
const { validate } = require("../middleware/validateMiddleware");
const { isProjectOwner } = require("../middleware/isProjectOwner");
const { getCommentsByTask } = require("../controllers/commentController");

router.use(protect);


router.get("/", getTasksByProject);
router.post("/", isProjectOwner, taskValidator, validate, createTask);
router.put("/:id", updateTask);
router.delete("/:id", isProjectOwner, deleteTask);


router.delete("/:taskId/comments/:commentId", deleteComment);
router.get("/:taskId/comments", protect, getCommentsByTask);
module.exports = router;
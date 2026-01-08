const express = require("express");
const router = express.Router();
const projectCtrl = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const { projectValidator } = require("../middleware/projectValidator");
const { validate } = require("../middleware/validateMiddleware");


router.use(protect);


router.get("/stats/all", projectCtrl.getProjectStats);


router.get("/", projectCtrl.getProjects);
router.get("/:id", projectCtrl.getProjectById);
router.post("/", projectValidator, validate, projectCtrl.createProject);
router.put("/:id", projectValidator, validate, projectCtrl.updateProject);
router.delete("/:id", projectCtrl.deleteProject);


router.post("/:id/members", projectCtrl.addMember);
router.delete('/:id/members/:memberId', projectCtrl.removeMember);

module.exports = router;
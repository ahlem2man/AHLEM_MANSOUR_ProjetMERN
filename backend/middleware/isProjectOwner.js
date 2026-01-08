const Project = require("../models/Project");
const Task = require("../models/Task");

exports.isProjectOwner = async (req, res, next) => {
  try {
    let projectId;

    
    if (req.params.id) {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: "Tâche introuvable" });
      projectId = task.project;
    } else if (req.body.projectId) {
      projectId = req.body.projectId;
    }

    if (!projectId) return res.status(400).json({ message: "ID du projet manquant" });

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Projet introuvable" });

    
    const isOwner = project.owner.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (isOwner || isAdmin) {
      return next(); 
    }

    return res.status(403).json({ message: "Action réservée au propriétaire ou à l'admin" });
  } catch (error) {
    res.status(500).json({ message: "Erreur de permission", error: error.message });
  }
};
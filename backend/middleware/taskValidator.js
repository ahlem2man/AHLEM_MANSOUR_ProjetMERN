const { body } = require("express-validator");

exports.taskValidator = [
  body("title")
    .if(body("title").exists()) 
    .notEmpty()
    .withMessage("Titre de la tâche obligatoire"),
    
  body("projectId")
    .if((value, { req }) => req.method === 'POST') 
    .notEmpty()
    .withMessage("Project ID requis"),

  body("status")
    .optional()
    .isIn(["todo", "doing", "done"])
    .withMessage("Statut invalide"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priorité invalide"),
];
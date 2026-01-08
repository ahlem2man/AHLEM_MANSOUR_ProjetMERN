require('dotenv').config(); // ✅ Ligne 1 : Déjà correct, charge le .env
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const commentRoutes = require("./routes/commentRoutes");
const aiRoutes = require("./routes/aiRoutes");

// ❌ SUPPRIMEZ LA LIGNE "dotenv.config();" QUI ÉTAIT ICI ❌

const app = express();

// --- CONFIGURATION CORS ---
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API Gestion de Projets Collaboratifs 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/profiles", require("./routes/profileRoutes"));
app.use("/api/ai", aiRoutes); 


const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connecté");
    app.listen(PORT, () =>
      console.log(`🚀 Serveur lancé sur le port ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Erreur MongoDB :", err));
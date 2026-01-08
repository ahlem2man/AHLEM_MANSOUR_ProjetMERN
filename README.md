
# AHLEM_MANSOUR_ProjetMERN - Gestion de Projets Collaboratifs

##  Description
Application MERN (MongoDB, Express, React, Node.js) pour gérer des projets, tâches, membres et commentaires, avec authentification JWT et une intégration IA Gemini pour générer des descriptions.

##  Fonctionnalités
- Authentification JWT (register/login), rôles admin/member, hash bcrypt
- Projets : CRUD, membres (Many-to-Many), stats
- Tâches : CRUD, statuts (todo/doing/done), priorités, assignation
- Commentaires sur les tâches
- Profils utilisateurs (édition)
- IA Gemini : génération de description de projet (fallback prévu)
- Validation des données (express-validator), CORS configuré

##  Architecture
```
backend/
	controllers/ auth, project, task, comment, profile, ai
	middleware/  auth, validators, isProjectOwner
	models/      User, Profile, Project, Task, Comment
	routes/      auth, projects, tasks, comments, profiles, ai, users
	server.js, package.json, .env (non versionné)
frontend/
	src/ components, pages, context, layouts, api, App.jsx, main.jsx
	vite.config.js, tailwind.config.js, package.json
README.md
```

##  Modèle de données (extraits)
- 1-to-1 : Profile ↔ User
- 1-to-Many : Project → Task ; Task → Comment
- Many-to-Many : Project ↔ User (`members`)

##  Installation
```bash
# Backend
cd backend
npm install
cp .env.example .env   # à créer si absent
npm run dev             # ou npm start

# Frontend
cd ../frontend
npm install
npm run dev
```

##  Variables d'environnement (backend/.env)
```
MONGO_URI=mongodb://localhost:27017/projet-mern
JWT_SECRET=votre_secret_jwt
PORT=5000
GEMINI_API_KEY=cle_gemini_optionnelle
```

##  Endpoints principaux
- Auth : POST /api/auth/register, POST /api/auth/login
- Projects : GET/POST/PUT/DELETE /api/projects, GET /api/projects/:id, GET /api/projects/stats/all, POST /api/projects/:id/members, DELETE /api/projects/:id/members/:memberId
- Tasks : GET /api/tasks?projectId=..., POST /api/tasks, PUT /api/tasks/:id, DELETE /api/tasks/:id, GET /api/tasks/:taskId/comments, DELETE /api/tasks/:taskId/comments/:commentId
- Comments : POST /api/comments, GET /api/comments/task/:taskId, DELETE /api/comments/:id
- Profiles : GET /api/profiles/me, PUT /api/profiles/me
- Users (admin) : GET /api/users, PUT /api/users/:id/role
- IA : POST /api/ai/generate-description

##  Sécurité
- JWT 7j, middleware `protect` + `isAdmin`
- Hashage bcrypt (salt 10)
- Validation express-validator (auth/project/task)
- CORS autorise http://localhost:5173 (à rendre dynamique via env en prod)

##  IA Gemini
`POST /api/ai/generate-description` génère une description à partir d'un titre. Fallback texte par défaut si l'API échoue.

##  Tests rapides (curl)
```bash
curl -X POST http://localhost:5000/api/auth/register \
	-H "Content-Type: application/json" \
	-d '{"email":"test@example.com","password":"password123","firstName":"John","lastName":"Doe"}'

curl -X POST http://localhost:5000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email":"test@example.com","password":"password123"}'
```

##  Rapport
Voir le document détaillé .

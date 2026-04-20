# 🚀 PAS Group Submission: Professional Git Workflow

සාමාජිකයින් 7 දෙනා සඳහා තම අංශයට අදාළ වැඩ කොටස (assigned files) GitHub වෙත ඇතුළත් කිරීමට අවශ්‍ය **නිශ්චිත Git Commands** පහත දැක්වේ. සෑම සාමාජිකයෙකුම තමන්ට අදාළ කොටස පමණක් ක්‍රියාත්මක කළ යුතුය.

---

## 🏗️ පියවර 0: Team Lead (ප්‍රථමයෙන් මෙය කරන්න)
*Repository එක ආරම්භ කිරීම සඳහා:*
```bash
cd PAS-Group-Project
git init
git remote add origin <ඔබේ_GITHUB_REPO_URL>
git add .
git commit -m "chore: initial project scaffolding"
git branch -M main
git push -u origin main
```

---

## 👥 සාමාජිකයින් 7 දෙනාගේ Git විධානයන් (Git Commands)

### 👤 Member 1: Database Architect
**Branch:** `feat/db-architecture`
**Files:** Models & Data Context
```bash
# 1. Branch එකක් සාදා එයට මාරු වන්න
git checkout -b feat/db-architecture

# 2. අදාළ Files පමණක් එක් කරන්න
git add backend/Models/*.cs backend/Data/ApplicationDbContext.cs backend/Data/DbInitializer.cs backend/Migrations/* backend/Database/SeedDemoData.sql

# 3. Commit කර Push කරන්න
git commit -m "feat(db): implemented data models and dbcontext"
git push origin feat/db-architecture
```

---

### 👤 Member 2: Backend Logic Developer
**Branch:** `feat/backend-services`
**Files:** Services & Repositories
```bash
# 1. Branch එකක් සාදා එයට මාරු වන්න
git checkout -b feat/backend-services

# 2. අදාළ Files පමණක් එක් කරන්න
git add backend/Services/AuthService.cs backend/Services/ProposalService.cs backend/Services/UserService.cs backend/Services/AuditLogService.cs backend/Services/MatchingService.cs

# 3. Commit කර Push කරන්න
git commit -m "feat(logic): implemented core business services"
git push origin feat/backend-services
```

---

### 👤 Member 3: API & Security Developer
**Branch:** `feat/api-controllers`
**Files:** Web API Controllers
```bash
# 1. Branch එකක් සාදා එයට මාරු වන්න
git checkout -b feat/api-controllers

# 2. අදාළ Files පමණක් එක් කරන්න
git add backend/Controllers/AuthController.cs backend/Controllers/ProposalsController.cs backend/Controllers/UsersController.cs backend/Controllers/AuditLogsController.cs backend/Controllers/ResearchAreasController.cs

# 3. Commit කර Push කරන්න
git commit -m "feat(api): implemented restful controllers"
git push origin feat/api-controllers
```

---

### 👤 Member 4: Frontend Theme & UI Lead
**Branch:** `feat/ui-foundation`
**Files:** Styles & Common Layouts
```bash
# 1. Branch එකක් සාදා එයට මාරු වන්න
git checkout -b feat/ui-foundation

# 2. අදාළ Files පමණක් එක් කරන්න
git add src/index.css src/UnifiedTheme.css src/App.jsx src/main.jsx src/components/StudentLayout.jsx src/components/Sidebar.jsx src/components/DashboardWidgets.jsx

# 3. Commit කර Push කරන්න
git commit -m "feat(ui): established unified theme and layouts"
git push origin feat/ui-foundation
```

---

### 👤 Member 5: Frontend Application Dev (Portals)
**Branch:** `feat/user-portals`
**Files:** Student & Supervisor Dashboard Pages
```bash
# 1. Branch එකක් සාදා එයට මාරු වන්න
git checkout -b feat/user-portals

# 2. අදාළ Files පමණක් එක් කරන්න
git add src/pages/StudentDashboard.jsx src/pages/SupervisorDashboard.jsx src/pages/NewProposal.jsx src/pages/ManageProposals.jsx src/pages/BrowseProposals.jsx src/pages/MyProjects.jsx src/pages/MatchReveal.jsx

# 3. Commit කර Push කරන්න
git commit -m "feat(frontend): implemented student and supervisor portals"
git push origin feat/user-portals
```

---

### 👤 Member 6: Frontend Admin & Identity
**Branch:** `feat/admin-tools`
**Files:** Admin Pages & Auth UI
```bash
# 1. Branch එකක් සාදා එයට මාරු වන්න
git checkout -b feat/admin-tools

# 2. අදාළ Files පමණක් එක් කරන්න
git add src/pages/Login.jsx src/pages/ForgotPassword.jsx src/pages/ModuleLeaderDashboard.jsx src/pages/UserManagement.jsx src/pages/AuditLogs.jsx src/pages/ResearchAreas.jsx src/pages/ProfileSettings.jsx

# 3. Commit කර Push කරන්න
git commit -m "feat(frontend): implemented admin dashboard and auth flows"
git push origin feat/admin-tools
```

---

### 👤 Member 7: Integration & QA Engineer
**Branch:** `feat/qa-integration`
**Files:** API Utils, Tests & Public Pages
```bash
# 1. Branch එකක් සාදා එයට මාරු වන්න
git checkout -b feat/qa-integration

# 2. අදාළ Files පමණක් එක් කරන්න
git add src/utils/api.js src/context/SettingsContext.jsx backend.Tests/* src/pages/WelcomePage.jsx src/pages/AboutPage.jsx src/pages/FAQPage.jsx src/pages/SupportPage.jsx

# 3. Commit කර Push කරන්න
git commit -m "feat(qa): implemented unit tests and integration utils"
git push origin feat/qa-integration
```

---

## 🛑 අවවාදයයි (Important)
සෑම සාමාජිකයෙකුම තමන්ගේ අංශයට අදාළ files පමණක් `git add` කළ යුතු බව සහතික කරගන්න. එසේ නොවුනහොත් merge conflicts ඇතිවිය හැක.

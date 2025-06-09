# 🧠 TechSudo Knowledge Dashboard

Un tableau de bord personnel et professionnel pour centraliser toutes les ressources, compétences et benchmarks liés à la montée en puissance de TechSudo — la future plus grande boîte de conseil tech de France 🇫🇷🚀

---

## 🎯 Objectif du projet

- Créer un **QG numérique personnel** pour maîtriser ses connaissances techniques
- Structurer une **base de données intelligente** des ressources (articles, vidéos, papers…)
- Construire un **skill tree dynamique** des compétences (avec graphe visuel et progression)
- Lier chaque ressource à une ou plusieurs compétences
- Intégrer à terme des **fonctionnalités IA avancées** (résumés automatiques, suggestions de lecture)
- Avoir une UX rapide, propre, évolutive, et **full customisable** pour les besoins de TechSudo

---

## ⚙️ Stack technique

| Technologie        | Usage                                              |
|--------------------|----------------------------------------------------|
| **Next.js 14**     | Frontend avec App Router                           |
| **Tailwind CSS**   | UI rapide, responsive, lisible                     |
| **Supabase**       | Backend (PostgreSQL + Auth + API)                  |
| **TypeScript**     | Typage strict, lisibilité et fiabilité             |
| **React Flow**     | Visualisation interactive du skill tree            |
| **OpenAI API**     | (à venir) Résumés automatiques des ressources      |

---

## 📦 Fonctionnalités v1 (déjà codées)

- [x] Création de ressources techniques (titre, lien, type, tags, statut)
- [x] Affichage dynamique des ressources
- [x] Création de compétences avec niveau, domaine, progression
- [x] Liaison des ressources et compétences via table pivot
- [x] Visualisation interactive du graphe des compétences
- [x] Coloration des nœuds selon domaine (IA, Web…)
- [x] Affichage des ressources associées à chaque skill
- [x] Sidebar gauche dynamique déclenchée au double-clic
- [x] **Ajout d’un champ de notes personnelles par ressource**


---

## 🔜 Prochaines fonctionnalités prévues

- [ ] Modifier la progression d’une compétence depuis le graphe
- [ ] Formulaire d’édition et suppression
- [ ] Pages dédiées : `/skills`, `/resources`, `/graph`
- [ ] Résumé automatique via OpenAI
- [ ] Interface utilisateur avancée et professionnelle
- [ ] Gestion multi-utilisateurs (Supabase Auth)


---

## 💡 Vision long terme

> Ce projet est une **brique stratégique** pour TechSudo :
- Il sert de hub personnel de montée en compétences
- Il devient un **template réutilisable** pour les clients (ex : version Knowledge OS d’entreprise)
- Il structure une approche unique du **growth personnel par la tech**
- Il pourra être intégré dans un SaaS, un CRM, ou un outil d’apprentissage immersif

---

## 📁 Structure du projet

.
├── src/
│   ├── app/
│   │   ├── page.tsx → Ajout et affichage des ressources/compétences
│   │   └── graph/page.tsx → Visualisation du skill tree (React Flow)
│   ├── lib/ → Supabase client, utils
│   ├── types/ → Types TypeScript centralisés
├── public/ → Fichiers statiques (favicon, illustrations)
├── README.md → Présentation du projet
├── progress.md → Journal d'avancement
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

| Technologie     | Usage                                       |
|-----------------|---------------------------------------------|
| **Next.js 14**  | Frontend avec App Router                    |
| **Tailwind CSS**| UI rapide, responsive, lisible              |
| **Supabase**    | Backend (PostgreSQL + Auth + API)           |
| **TypeScript**  | Typage strict, lisibilité et fiabilité      |
| **React Flow** (à venir) | Visualisation interactive du skill tree |
| **OpenAI API** (à venir) | Résumés automatiques des ressources |

---

## 📦 Fonctionnalités v1 (déjà codées)

- [x] Création de ressources techniques (titre, lien, type, tags, statut)
- [x] Affichage dynamique des ressources (liens cliquables)
- [x] Création de compétences (nom, description, niveau, domaine)
- [x] Affichage de toutes les compétences
- [x] Connexion complète à Supabase (insert + select)
- [x] Typage pro avec TypeScript
- [x] UI responsive via Tailwind

---

## 🔜 Prochaines fonctionnalités prévues

- [ ] Lier des ressources à des compétences existantes (many-to-many)
- [ ] Formulaire d’édition et suppression
- [ ] Visualisation du skill tree avec `React Flow`
- [ ] Page `/skills` dédiée, page `/resources` dédiée
- [ ] Résumé automatique d’un article via OpenAI API
- [ ] Interface utilisateur améliorée et professionnelle
- [ ] Gestion multi-utilisateurs avec Supabase Auth

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
│ ├── app/ → Pages Next.js (App Router)
│ │ └── page.tsx → Page principale (ajout + affichage)
│ ├── lib/ → Fichiers de connexion (ex: supabaseClient)
│ ├── types/ → Définition des types TypeScript
│
├── public/ → Fichiers statiques (favicon, images...)
├── README.md → Présentation complète du projet
├── progress.md → Journal d'avancement

yaml
Copier
Modifier

---

## 🧠 Auteur

Développé par un CTO en devenir, bâtisseur de TechSudo — avec une vision de scalabilité, excellence et productivité.  
yaml
Copier
Modifier

---

## 📜 Licence

Projet personnel. Libre de réutilisation privée, mais pas de distribution publique sans accord.
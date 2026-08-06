# Copilot Instructions — Portfolio Fullstack

## Contexte du projet
Portfolio personnel (vitrine) avec présentation, liste de projets, et formulaire de
contact. Développeur solo, niveau intermédiaire en fullstack, objectif : apprendre en
construisant, code propre mais pas sur-ingénieré. Déploiement prévu en Docker sur un
petit serveur (Oracle Cloud Free Tier ARM ou VPS 2-3€/mois), donc la sobriété en
ressources (RAM/CPU) est un critère de choix, pas un détail.

## Stack technique

### Frontend
- **Astro** comme framework principal (rendu statique par défaut, zéro JS envoyé
  sauf besoin explicite)
- **React** uniquement pour les "islands" interactives (formulaire de contact,
  filtres de projets) via `@astrojs/react`
- **Tailwind CSS** pour le style, pas de CSS-in-JS
- TypeScript partout, mode `strict` activé

### Backend
- **Node.js + Fastify** + TypeScript
- Architecture en couches simples : `routes/` → `services/` → `repositories/`
- Validation des entrées avec **Zod** sur chaque route
- Pas de framework lourd (pas de NestJS) — garder le code lisible et explicite

### Base de données
- **PostgreSQL** via Docker
- **Drizzle ORM** (pas Prisma) : migrations explicites, requêtes proches du SQL
- Schémas dans `db/schema.ts`, migrations générées avec `drizzle-kit`

### Infra / Déploiement
- Tout le projet est conteneurisé : `frontend/`, `backend/`, `Dockerfile` multi-stage
  pour chaque service
- `docker-compose.yml` à la racine orchestrant : frontend, backend, db, et **Caddy**
  en reverse proxy (HTTPS automatique)
- Variables sensibles toujours via fichier `.env` (jamais commité — vérifier `.gitignore`)
- Cible : serveur ARM à ressources limitées → éviter les dépendances lourdes,
  privilégier les images Docker `alpine` ou `slim`

## Contenu du portfolio
- Le fichier `cv.pdf` (ou `cv.md` si converti) à la racine du repo est la **source de
  vérité** pour tout le contenu réel du site : bio, expériences, compétences, projets
- Copilot ne doit **jamais inventer** d'expérience professionnelle, de compétence,
  de projet ou de chiffre (années d'XP, technologies maîtrisées, etc.) qui ne figure
  pas dans le CV — pas de contenu placeholder générique type "Lorem ipsum" ou
  "passionné de développement depuis toujours" sans info réelle derrière
- Si une information nécessaire au contenu manque (photo, lien GitHub, description
  détaillée d'un projet), Copilot doit laisser un commentaire `// TODO: contenu à
  compléter` plutôt que de combler avec du texte inventé
- Structure de contenu attendue sur le site :
  - Section hero : nom, titre/rôle, courte accroche
  - À propos : résumé du profil basé sur le CV
  - Expériences : reprises fidèlement du CV (poste, entreprise, période, réalisations)
  - Compétences techniques : classées par catégorie (langages, frameworks, outils),
    reflétant fidèlement ce qui est dans le CV
  - Projets : mis en avant séparément des expériences pro, avec lien repo/démo si
    disponible
  - Contact : formulaire relié à l'API backend (Fastify)
- Ton du contenu : professionnel mais pas corporate/froid — c'est un portfolio perso,
  pas un CV PDF réchauffé

## Conventions de code
- Noms de variables/fonctions en anglais, commentaires en français si besoin de contexte
- `async/await` uniquement, jamais de `.then()` chaîné
- Gestion d'erreurs explicite : pas de `try/catch` vide, toujours logger ou remonter
  une erreur typée
- Un composant Astro/React = un fichier, pas de fichiers "god component"
- Imports absolus via alias (`@/components`, `@/lib`) plutôt que des chemins relatifs
  profonds (`../../../`)

## Tests
- Pas de sur-ingénierie de tests pour un portfolio, mais tester au minimum :
  - Les endpoints backend critiques (contact form) avec Vitest
  - Pas de tests E2E pour l'instant (à ajouter si le projet grossit)

## Git
- Commits en anglais, format conventionnel : `feat:`, `fix:`, `chore:`, `docs:`
- Pas de commit direct sur `main` pour les changements structurants — utiliser une
  branche même en solo, pour garder l'habitude

## Ce que Copilot doit éviter
- Ne pas proposer Next.js, Prisma, NestJS, Express, MongoDB — ce ne sont pas les
  choix de ce projet, même si ce sont des suggestions "par défaut" fréquentes
- Ne pas ajouter de dépendances lourdes sans raison claire (le serveur cible a des
  ressources limitées)
- Ne pas générer de CSS custom quand une classe Tailwind existe déjà pour le besoin
- Ne pas inventer de variables d'environnement sans les documenter dans `.env.example`
# Mamou Sahara – Next.js (i18n)

Location de voitures – Errachidia, Merzouga et tout le Maroc.

## Langues

- Français `/fr`
- English `/en`
- العربية `/ar` (RTL)
- Español `/es`

## Installation

```bash
cd mamou-sahara
npm install
npm run dev
```

Ouvrir http://localhost:3000 (redirige vers `/fr`)

## Structure i18n

- `app/[locale]/` – pages par langue
- `messages/{fr,en,ar,es}.json` – traductions
- `middleware.js` – détection / redirection locale
- `lib/i18n.js` – helpers
- `components/LanguageSwitcher.js` – sélecteur de langue

## Contact

- WhatsApp : +212 6 19 21 32 38
- Email : mamou-sahara@gmail.com

## Admin dashboard (Supabase)

Dashboard statique : `public/dashboard.html` (FR / AR, photos depuis la galerie ou la caméra).

### 1. Projet Supabase
https://supabase.com -> New project

### 2. Schéma SQL
SQL Editor -> coller et exécuter `supabase/schema.sql`

### 3. Utilisateur admin
Authentication -> Users -> Add user (email + mot de passe définis dans Supabase, jamais dans le code)

### 4. Variables d'environnement
Local : `.env.local` (déjà créé). Sur Vercel : Settings -> Environment Variables, ajouter
`NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Le dashboard contient aussi l'URL et la clé publique (`sb_publishable_...`) en haut du script
(`SUPABASE_URL`, `SUPABASE_KEY`) : à modifier si vous changez de projet Supabase.

### 5. Lancer
```bash
npm install
npm run dev
```

### Routes
- `/admin/login` – connexion
- `/admin` – redirige vers `/dashboard.html`
- `/dashboard.html` – gestion des voitures (protégé : redirige vers le login sans session)

Les voitures sont dans la table `cars`, les photos dans le bucket `cars`.

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

### 1. Create a Supabase project
https://supabase.com → New project

### 2. Run SQL schema
SQL Editor → paste and run `supabase/schema.sql`

### 3. Create admin user
Authentication → Users → Add user  
- Email: `mamousahara.com@gmail.com`  
- Password: set in the Supabase dashboard (do **not** put it in the code)

### 4. Env vars
Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 5. Run

```bash
npm install
npm run dev
```

Open: http://localhost:3000/admin/login

### Routes
- `/admin/login` – email login
- `/admin` – manage cars (CRUD + photos)

Cars are stored in the `cars` table and photos in the `cars` storage bucket.

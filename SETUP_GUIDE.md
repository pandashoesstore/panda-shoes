# 🐼 Panda Shoes — Full Setup Guide

Follow these steps in order. Each one takes 5–15 minutes.

---

## STEP 1 — Set Up GitHub (free)

1. Go to https://github.com and create a free account
2. Click **New Repository** → name it `panda-shoes` → Create
3. Upload the entire `panda-shoes` folder to the repo
   (or use: `git init && git add . && git commit -m "init" && git push`)

---

## STEP 2 — Set Up Supabase (free tier available)

1. Go to https://supabase.com → **Start for free**
2. Create a new project (pick any region, set a strong password)
3. Wait ~2 min for it to spin up
4. Go to **SQL Editor** (left sidebar)
5. Copy the entire contents of `supabase-schema.sql` and paste it in
6. Click **Run** — this creates your tables and seeds your products!
7. Go to **Project Settings → API**
8. Copy these values (you'll need them in Step 4):
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

---

## STEP 3 — Set Up Stripe (takes payments)

1. Go to https://stripe.com → create account & verify email
2. In the dashboard, click **Developers → API keys**
3. Copy:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`
4. For the webhook secret (do this after Step 4):
   - Go to **Developers → Webhooks → Add endpoint**
   - URL: `https://YOUR-VERCEL-URL.vercel.app/api/webhook`
   - Event: `checkout.session.completed`
   - Copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`

> ⚠️ Start with **test mode** (toggle at top of Stripe dashboard).
> Switch to live mode when you're ready to accept real payments.

---

## STEP 4 — Set Up Resend (free email sending)

1. Go to https://resend.com → Create free account
2. Go to **API Keys → Create API Key**
3. Copy the key → `RESEND_API_KEY`
4. Add your domain (or use the free `@resend.dev` address for testing)
5. Set `EMAIL_FROM` to your verified email address

---

## STEP 5 — Deploy to Vercel (free)

1. Go to https://vercel.com → **Sign up with GitHub**
2. Click **Add New Project** → Import your `panda-shoes` repo
3. Before deploying, click **Environment Variables** and add ALL of these:

```
NEXT_PUBLIC_SUPABASE_URL         = (from Step 2)
NEXT_PUBLIC_SUPABASE_ANON_KEY    = (from Step 2)
SUPABASE_SERVICE_ROLE_KEY        = (from Step 2)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = (from Step 3)
STRIPE_SECRET_KEY                = (from Step 3)
STRIPE_WEBHOOK_SECRET            = (from Step 3, add after first deploy)
RESEND_API_KEY                   = (from Step 4)
EMAIL_FROM                       = orders@yourdomain.com
ADMIN_EMAIL                      = you@yourdomain.com
NEXT_PUBLIC_SITE_URL             = https://YOUR-VERCEL-URL.vercel.app
ADMIN_SECRET                     = (make up any random string)
```

4. Click **Deploy** — Vercel builds and publishes your site!
5. Your site is live at `your-project.vercel.app`

---

## STEP 6 — Add Your Custom Domain (optional, ~$12/yr)

1. Buy a domain at https://namecheap.com (e.g. `pandashoes.com`)
2. In Vercel → your project → **Settings → Domains**
3. Add your domain and follow Vercel's DNS instructions

---

## STEP 7 — Add Shoe Photos

1. In Supabase → **Storage** → Create a bucket called `product-images`
2. Upload your shoe photos
3. Copy each image's public URL
4. In Supabase → **Table Editor → products** → update the `image_url` column for each product

---

## YOUR PAGES

| Page | URL |
|------|-----|
| Homepage | `/` |
| Men's Shop | `/shop/mens` |
| Women's Shop | `/shop/womens` |
| Kids' Shop | `/shop/kids` |
| All Products | `/shop` |
| Checkout | `/checkout` |
| Admin Dashboard | `/admin` |
| Admin Orders | `/admin/orders` |
| Admin Products | `/admin/products` |

---

## GOING LIVE WITH REAL PAYMENTS

When ready to accept real money:
1. In Stripe, complete your **business verification**
2. Toggle from **Test mode → Live mode**
3. Get your **live API keys** and update them in Vercel environment variables
4. Update your Stripe webhook to use live mode endpoint too
5. Re-deploy

---

## NEED HELP?

- Supabase docs: https://supabase.com/docs
- Stripe docs: https://stripe.com/docs
- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs

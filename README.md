<div align="center">

# ∞ NodeFlow

### **Visual Workflow Automation — Built for Developers**

_Design, connect, and execute automated workflows with a drag-and-drop node editor.  
Powered by real-time execution, AI integration, and durable background jobs._

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-axionflow--gilt.vercel.app-black?style=for-the-badge)](https://axionflow-gilt.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## ✨ What is NodeFlow?

NodeFlow is a **full-stack, visual workflow automation platform** — think Zapier or n8n, but self-hostable and developer-first. Build powerful automations by connecting trigger nodes to action nodes on an interactive canvas, then watch them execute in real-time.

<div align="center">

```
  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
  │ 📋 Google    │─────▶│ 🌐 HTTP      │─────▶│ 🤖 AI Node   │─────▶│ 💬 Slack     │
  │    Form      │      │    Request   │      │   (Gemini)   │      │    Message   │
  └──────────────┘      └──────────────┘      └──────────────┘      └──────────────┘
       TRIGGER              ACTION                ACTION                ACTION
```

</div>

---

## 🚀 Key Features

| Feature | Description |
|:--------|:------------|
| 🎨 **Visual Node Editor** | Drag-and-drop canvas powered by React Flow — connect nodes to build workflows visually |
| ⚡ **Real-Time Execution** | Watch your workflow execute node-by-node with live status updates via Inngest Realtime |
| 🔗 **Multiple Triggers** | Start workflows from Google Forms, Stripe webhooks, or manual triggers |
| 🤖 **AI Integration** | Built-in AI node powered by Google Gemini for text generation and data processing |
| 💬 **Notifications** | Send automated messages to Discord and Slack channels |
| 🌐 **HTTP Requests** | Make external API calls with dynamic Handlebars templating |
| 🔒 **Authentication** | Secure sign-in with email/password, GitHub, and Google OAuth via better-auth |
| 📊 **Execution History** | Track and monitor all workflow executions |
| 💳 **Subscription System** | Integrated billing and subscription management via Polar.sh |
| 🛡️ **Error Tracking** | Production monitoring with Sentry integration |

---

## 🧱 Tech Stack

<div align="center">

| Layer | Technology |
|:------|:-----------|
| **Framework** | Next.js 16 (App Router + Turbopack) |
| **Language** | TypeScript (strict) |
| **Database** | PostgreSQL via Prisma ORM |
| **API Layer** | tRPC v11 + TanStack React Query |
| **Auth** | better-auth (email + OAuth) |
| **Background Jobs** | Inngest (durable functions + realtime) |
| **Canvas Editor** | React Flow (`@xyflow/react`) |
| **State** | Jotai (atom-based) |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **Payments** | Polar.sh |
| **Monitoring** | Sentry |

</div>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                              │
│  React Flow Canvas  ←→  Jotai Store  ←→  tRPC Client       │
│                              ↕                              │
│                    Inngest Realtime (SSE)                    │
└──────────────────────────┬──────────────────────────────────┘
                           │  tRPC / HTTP
┌──────────────────────────▼──────────────────────────────────┐
│                     NEXT.JS SERVER                          │
│  tRPC Router  │  Webhook Handlers  │  Auth (better-auth)    │
└───────┬───────┴────────┬───────────┴────────────────────────┘
        │                │
        ▼                ▼
  ┌───────────┐   ┌─────────────┐   ┌──────────────────────┐
  │ PostgreSQL│   │   Inngest   │──▶│  Executor Pipeline   │
  │  (Prisma) │   │  (Durable)  │   │  ┌────┬────┬────┐    │
  └───────────┘   └─────────────┘   │  │HTTP│ AI │Slack│...│
                                    │  └────┴────┴────┘    │
                                    └──────────────────────┘
```

### Execution Pipeline

1. **Trigger** fires (webhook, manual click, or external event)
2. **Inngest** picks up the event as a durable background function
3. Nodes are **topologically sorted** to resolve the execution order (DAG)
4. Each node's **executor** runs sequentially, reading from and writing to a shared `context`
5. **Handlebars templating** resolves dynamic expressions like `{{googleForm.responses.email}}`
6. **Realtime channels** push `loading → success/error` status updates to the browser

---

## 🧩 Supported Nodes

| Node | Type | Description |
|:-----|:-----|:------------|
| ▶ Manual Trigger | `TRIGGER` | Start a workflow manually from the editor |
| 📋 Google Form | `TRIGGER` | Start a workflow when a Google Form is submitted |
| 💳 Stripe | `TRIGGER` | Start a workflow on Stripe events (e.g., checkout completed) |
| 🌐 HTTP Request | `ACTION` | Make GET/POST/PUT/DELETE requests to any API |
| 🤖 AI (Gemini) | `ACTION` | Generate text using Google Gemini AI models |
| 💬 Discord | `ACTION` | Send messages to Discord channels via webhooks |
| 💬 Slack | `ACTION` | Send messages to Slack channels via webhooks |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/                # Sign-in / Sign-up pages
│   ├── (dashboard)/           # Workflow list, editor, executions
│   └── api/
│       ├── trpc/              # tRPC HTTP handler
│       ├── auth/              # better-auth handler
│       ├── inngest/           # Inngest function router
│       └── webhooks/          # Google Form & Stripe webhooks
├── features/
│   ├── auth/                  # Auth UI components
│   ├── editor/                # React Flow canvas + Jotai store
│   ├── executions/            # Executor registry + node executors
│   ├── triggers/              # Trigger node components
│   ├── workflows/             # Workflow CRUD + list
│   ├── credentials/           # OAuth credential management
│   └── subscriptions/         # Billing & upgrade flow
├── inngest/
│   ├── client.ts              # Inngest client init
│   ├── functions.ts           # executeWorkflow durable function
│   ├── utils.ts               # topologicalSort + event dispatcher
│   └── channels/              # Realtime publish channels
├── trpc/                      # tRPC router + context setup
├── lib/                       # Prisma client + utilities
└── generated/                 # Auto-generated Prisma types
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** 18+
- **PostgreSQL** database
- **Inngest CLI** (for local development)
- **ngrok** (optional — for testing external webhooks locally)

### 1. Clone & Install

```bash
git clone https://github.com/ShreyashXP095/automateit.git
cd automateit
npm install
```

### 2. Configure Environment

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nodeflow"

# Auth
BETTER_AUTH_SECRET=""
BETTER_AUTH_URL="http://localhost:3000"

# OAuth Providers
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Inngest
INNGEST_EVENT_KEY="..."
INNGEST_SIGNING_KEY="..."

# AI (Google Gemini)
GOOGLE_GENERATIVE_AI_API_KEY="..."

# Webhooks (ngrok URL for local dev)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 3. Set Up the Database

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Run the Development Server

```bash
# Start everything (Next.js + Inngest dev server)
npm run dev:all

# Or run individually
npm run dev          # Next.js (port 3000)
npm run inngest:dev  # Inngest dev server
```

Open [http://localhost:3000](http://localhost:3000) to start building workflows! 🎉

---

## 🌐 Deployment

The app is deployed on **Vercel** with a managed PostgreSQL database.

**Live Demo →** [axionflow-gilt.vercel.app](https://axionflow-gilt.vercel.app/)

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ShreyashXP095/n8nLocalOne)

> **Note:** You'll need to configure the environment variables listed above in your Vercel project settings, and set up a PostgreSQL database (e.g., Supabase, Neon, or Railway).

---

## 💡 Example Workflows

### 📋 Job Application Pipeline
```
Google Form → HTTP Request → AI Summary → Slack Notification
```
When a candidate submits an application, automatically log it, generate an AI summary, and notify the hiring team.

### 💳 Stripe → Customer Onboarding
```
Stripe Webhook → HTTP (Provision Account) → Discord Notification
```
When a customer pays, provision their account via an internal API and send a welcome message.

### 📊 Daily Report Generator
```
Manual Trigger → HTTP (Fetch Analytics) → AI (Summarize) → Slack Post
```
Fetch analytics data, generate a human-readable summary with AI, and post it to Slack.

---

## 🛠️ Built With

<div align="center">

[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://prisma.io)
[![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=flat-square&logo=trpc&logoColor=white)](https://trpc.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Inngest](https://img.shields.io/badge/Inngest-4636E3?style=flat-square)](https://inngest.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![Sentry](https://img.shields.io/badge/Sentry-362D59?style=flat-square&logo=sentry&logoColor=white)](https://sentry.io)

</div>

---

<div align="center">

**⭐ Star this repo if you found it useful!**

Made with ❤️ using Next.js, tRPC, Inngest & React Flow

[Live Demo](https://axionflow-gilt.vercel.app/) · [Report Bug](https://github.com/ShreyashXP095/n8nLocalOne/issues) · [Request Feature](https://github.com/ShreyashXP095/n8nLocalOne/issues)

</div>

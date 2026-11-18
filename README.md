# Task Manager

A simple **Task Manager** built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **MongoDB** (via Mongoose). The app demonstrates a clean component‑based architecture, a reusable `useTasks` hook, and a modern UI with features such as:

- Create, read, update, and delete tasks.
- Optional **due date** for each task.
- Task status toggling (complete / pending).
- Search/filter tasks by title.
- Fully typed data model (`Task` interface) shared across front‑end and back‑end.

## Project Structure
```
.
├─ app
│  ├─ api
│  │  └─ tasks
│  │     ├─ [id]
│  │     │   └─ route.js   # PATCH / DELETE a single task
│  │     └─ route.js       # GET / POST for the collection
│  ├─ components
│  │  ├─ TaskForm.tsx      # Form for creating a task
│  │  └─ TaskList.tsx      # List + actions for tasks
│  ├─ hooks
│  │  └─ useTasks.ts       # State + API wrapper
│  ├─ page.tsx            # Home page – composes the UI
│  └─ types.ts            # Shared `Task` interface (root alias @/types)
├─ lib
│  └─ db.js                # MongoDB connection helper
├─ models
│  └─ Task.js              # Mongoose schema (includes dueDate)
├─ public
├─ tailwind.config.ts
├─ tsconfig.json
└─ package.json
```

## Getting Started
### Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** instance (local or Atlas)
- **pnpm**, **yarn**, **npm**, or **bun** – any package manager you prefer.

### Installation
```bash
# Clone the repo (if you haven't already)
git clone <repo‑url>
cd task-manager

# Install dependencies
npm install   # or `yarn`, `pnpm install`, `bun install`
```

### Environment variables
Create a `.env.local` file in the project root with the following keys:
```dotenv
MONGODB_URI=mongodb+srv://<user>:<pwd>@<cluster>/<db>?retryWrites=true&w=majority
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
Replace the placeholder with your actual MongoDB connection string.

### Run the development server
```bash
npm run dev   # or `yarn dev` / `pnpm dev`
```
Open **http://localhost:3000** in your browser – you should see the Task Manager UI.

## Available Scripts
| Script | Description |
|--------|-------------|
| `dev` | Starts the Next.js development server with hot‑reloading. |
| `build` | Compiles the app for production. |
| `start` | Runs the production build locally. |
| `lint` | Runs ESLint (recommended to keep code quality high). |

## API Endpoints
| Method | URL | Description |
|--------|-----|-------------|
| `GET` | `/api/tasks?search=<term>` | Retrieve all tasks (optionally filtered by title). |
| `POST` | `/api/tasks` | Create a new task. Accepts `title`, `description`, `dueDate` (ISO string). |
| `PATCH` | `/api/tasks/:id` | Update a task – currently used for toggling status. |
| `DELETE` | `/api/tasks/:id` | Delete a task. |

All responses follow the shape:
```json
{ "success": true, "data": <payload>, "message": "..." }
```
When an error occurs, `success` is `false` and `message` contains the error details.

## UI Overview & Customisation
- **TaskForm** – Handles task creation. Includes a date picker for the optional due date.
- **TaskList** – Renders tasks with status badges, edit/delete buttons, and shows the due date if set.
- **useTasks Hook** – Centralises API calls, state handling, and provides a clean interface to components.

Feel free to extend the UI:
- Add **priority** dropdown (the `Task` interface already contains a `priority` field).
- Implement **sorting** (by due date, priority, or status).
- Add **dark mode** using Tailwind's `dark:` utilities.
- Introduce **pagination** for large task sets.

## Linting & Formatting
The project includes ESLint and Prettier configurations. Run:
```bash
npm run lint   # or `yarn lint`
```
Fix any lint errors, then commit the formatted code.

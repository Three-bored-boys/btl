import type { Environment } from "@/root/bindings";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { books } from "@/libs/server/src/hono/routes/books";
import { auth } from "@/libs/server/src/hono/routes/auth";

export const runtime = "nodejs";

const app = new Hono<Environment>().basePath("/api");

app.use(logger());
app.use(
  "*",
  cors({
    origin: (origin, _) => {
      if (
        origin.includes("-kosidinnas-projects.vercel.app") ||
        origin === "https://b-t-l.vercel.app" ||
        origin === "https://btl-nextjs-api-preview.kosiumeigbo.workers.dev" ||
        origin === "https://btl-nextjs-api-prod.kosiumeigbo.workers.dev" ||
        origin === "http://localhost:3000"
      ) {
        return origin;
      } else {
        return "http://localhost:8787";
      }
    },
    credentials: true,
  }),
);

app.get("/", (c) => {
  return c.text("Welcome to the BTL API! 🚀");
});

app.route("/books", books);
app.route("/auth", auth);

export type BooksApp = typeof books;
export type AuthApp = typeof auth;

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);

// export default app;

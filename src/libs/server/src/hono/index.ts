import type { Environment } from "@/root/bindings";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { books } from "@/libs/server/src/hono/routes/books";
import { auth } from "@/libs/server/src/hono/routes/auth";
import { userBooksApp as userBooks } from "@/libs/server/src/hono/routes/userBooks";

const app = new Hono<Environment>();
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
app.route("/user-books", userBooks);

export default app;

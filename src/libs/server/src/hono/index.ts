import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { hc } from "hono/client";
import books from "@/libs/server/src/hono/routes/books";

const app = new Hono().basePath("/api");
app.use(logger());
app.use("*", cors());

const routes = app
  .get("/", (c) => {
    return c.text("Welcome to the BTL API! 🚀");
  })
  .route("/books", books);

export type AppType = typeof routes;
export const client = hc<AppType>(process.env.NEXT_PUBLIC_URL);

export default app;

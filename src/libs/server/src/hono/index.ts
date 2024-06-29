import type { Environment } from "@/root/bindings";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import books from "@/libs/server/src/hono/routes/books";

const app = new Hono<Environment>();
app.use(logger());
app.use("*", cors());

app.get("/", (c) => {
  console.log("testing github actions again...");
  return c.text("Welcome to the BTL API! 🚀");
});

app.route("/books", books);

export default app;

import { handle } from "hono/vercel";
import app from "@/server/hono/index";

export const runtime = "edge";

export default app as never;

export const GET = handle(app);
export const POST = handle(app);

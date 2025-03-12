import { Hono } from "hono";
import { Environment } from "@/root/bindings";

export const userBooksApp = new Hono<Environment>();

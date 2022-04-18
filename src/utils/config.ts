import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config();

const URL = process.env.SUPABASE_URL_API as string;
const KEY = process.env.SUPABASE_SERVICE_KEY as string;

const supabase = createClient(URL, KEY);

export const auth = {
  secret: process.env.JWT_SUPER_SECRET as string,
} as const;

export { supabase };

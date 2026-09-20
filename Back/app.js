import { fileURLToPath } from "url";
import path from "path";
import express from 'express'



const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


const app = express()


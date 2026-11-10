import express from 'express';
import cors from 'cors'
import {prisma} from './lib/prisma.ts';
const verificarToken = require('./authMiddleware');
const bcrypt = require('bcryptjs');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());








app.listen(PORT, ()=>{
    console.log('server na porta 3000')
});
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const SEGREDO = '123456'; // Sua chave secreta super simples

// 1. ROTA PARA GERAR O TOKEN (Simulando o login)
app.get('/login', (req, res) => {
  // Cria um token simples que expira em 1 hora
  const token = jwt.sign({ usuario: 'joao' }, SEGREDO, { expiresIn: '1h' });
  res.send(`Seu token foi gerado! Use este link para testar a rota protegida: http://localhost:3000/perfil?token=${token}`);
});

// 2. MIDDLEWARE MAIS SIMPLES DO MUNDO PARA VERIFICAR O TOKEN
function meuMiddleware(req, res, next) {
  const token = req.query.token; // Pega o token direto da URL (?token=...)

  if (!token) {
    return res.status(401).send('Acesso negado: Cadê o token?');
  }

  try {
    const dados = jwt.verify(token, SEGREDO); // Verifica se o token é válido
    req.usuarioLogado = dados; // Salva os dados para a rota usar
    next(); // Passa para a rota protegida
  } catch (erro) {
    res.status(403).send('Token inválido ou expirado!');
  }
}

// 3. ROTA PROTEGIDA
app.get('/perfil', meuMiddleware, (req, res) => {
  res.send(`Bem-vindo, ${req.usuarioLogado.usuario}! Você passou pelo middleware.`);
});

app.listen(3000, () => console.log('Rode o servidor e acesse http://localhost:3000/login'));
<!DOCTYPE html>
<html lang="pt">
<body>
    <h1>Projeto Facilita Jurídico</h1>
      <h2>Descrição do Projeto</h2>
    <p>O projeto Facilita Jurídico é uma solução de gerenciamento de clientes desenvolvida para otimizar as rotas de visitas, visando reduzir custos e economizar tempo. O sistema permite o cadastro de clientes e utiliza algoritmo para calcular a menor rota possível, baseando-se em informações geográficas.</p>
   <h2>Visão Geral da API</h2>
    <p>Esta API fornece funcionalidades para o cadastro de clientes, incluindo:</p>
    <ul>
        <li>Nome</li>
        <li>Email</li>
        <li>Telefone</li>
        <li>CEP (utilizado pelo algoritmo para inserir longitude e latitude, buscando de APIs externas)</li>
    </ul>
      <h2>Iniciando o Projeto</h2>
    <h3>Pré-requisitos</h3>
    <p>Antes de iniciar, certifique-se de ter o Node.js e o npm instalados em seu computador.</p>
    <ul>
        <li>Node.js: Versão - v20.9.0</li>
        <li>npm: Versão - 10.2.3</li>
    </ul>
      <h3>Instalação</h3>
    <p>Siga os passos abaixo para configurar o projeto em sua máquina local:</p>
    <ol>
        <li><strong>Clone o repositório:</strong> Use o comando <code>git clone</code> para obter o projeto.</li>
        <pre><code>git clone https://github.com/leonardovilela100/facilita-juridico-server.git
cd facilita-juridico-server</code></pre>
        <li><strong>Instale as dependências:</strong> Execute <code>npm install</code> para instalar as dependências necessárias.</li>
        <pre><code>npm install</code></pre>
        <li><strong>Configuração do PostgreSQL:</strong> Instale o PostgreSQL e configure uma base de dados chamada 'facilitaJuridico'.</li>
        <ul>
            <li>Download PostgreSQL: <a href="https://sbp.enterprisedb.com/getfile.jsp?fileid=1258792">Link de Download</a></li>
            <li>Defina a senha do administrador do banco de dados: 'root'</li>
            <li>Crie a base de dados:</li>
            <pre><code>CREATE DATABASE facilitaJuridico</code></pre>
        </ul>
        <li><strong>Crie as tabelas do banco de dados:</strong> Execute o comando do Prisma para criar as tabelas no PostgreSQL.</li>
        <pre><code>npx prisma migrate dev</code></pre>
        <li><strong>Inicie o servidor de desenvolvimento:</strong> Use <code>npm run dev</code> para iniciar o servidor.</li>
        <pre><code>npm run dev</code></pre>
    </ol>
    <h3>Dependências</h3>
<p>As dependências incluem:</p>
<ul>
    <li><code>@prisma/client</code>: Cliente para consulta ao banco de dados com Prisma.</li>
    <li><code>axios</code>: Cliente HTTP baseado em promessas para fazer requisições.</li>
    <li><code>body-parser</code>: Middleware de análise de corpo para o Express.</li>
    <li><code>cors</code>: Middleware para habilitar CORS com várias opções.</li>
    <li><code>express</code>: Framework web rápido, flexível e minimalista para Node.js.</li>
    <li><code>express-async-errors</code>: Extensão para tratamento de erros assíncronos no Express.</li>
    <li><code>pg</code>: Cliente PostgreSQL não bloqueante para Node.js.</li>
    <li><code>pg-hstore</code>: Serializador e desserializador para hstore (formato de armazenamento de chave-valor no PostgreSQL).</li>
    <li><code>pg-promise</code>: Biblioteca para integração do PostgreSQL com promessas.</li>
    <li><code>prisma</code>: ORM moderno para Node.js e TypeScript.</li></ul>
<h3>DevDependencies</h3>
<p>As dependências de desenvolvimento incluem:</p>
<ul>
    <li><code>@types/cors</code>: Definições de tipo TypeScript para cors.</li>
    <li><code>@types/express</code>: Definições de tipo TypeScript para express.</li>
    <li><code>nodemon</code>: Ferramenta de monitoramento para aplicações Node.js.</li>
    <li><code>ts-node-dev</code>: Ferramenta de desenvolvimento que reinicia o projeto Node.js quando o arquivo é modificado.</li>
    <li><code>typescript</code>: Um superconjunto de JavaScript que compila para saída de JavaScript limpo.</li>
</ul>
      <h3>Estrutura de Pastas do Projeto</h3>
    <p>O projeto está estruturado da seguinte forma:</p>
    <pre><code>facilita-juridico-server/
├── prisma/
│   └── migrations/
├── src/
│   ├── controllers/
│   ├── enum/
│   ├── models/
│   ├── prisma/
│   ├── routes/
│   ├── services/
│   ├── utils/    
│   └── server.ts
</code></pre>
<h2>Dados de Exemplo para Cadastro de Clientes</h2>
    <p>Segue abaixo um exemplo de JSON com dados de clientes para ser utilizado no cadastro:</p>
    <pre><code>[
    {
      "nome": "Teste Cidade - Prata",
      "email": "prata@gmail.com",
      "telefone": "99999",
      "cep": "38140000"
    },
    {
      "nome": "Teste Cidade - Rio de Janeiro",
      "email": "rio@gmail.com",
      "telefone": "99999",
      "cep": "20230010"
    },
    {
      "nome": "Teste Cidade - Uberlandia",
      "email": "uberlandia@gmail.com",
      "telefone": "99999",
      "cep": "38204054"
    },
    {
      "nome": "Teste Cidade - São Jose Dos Campos",
      "email": "saojosedoscampos@gmail.com",
      "telefone": "99999",
      "cep": "12244521"
    },
    {
      "nome": "Teste Cidade - Araguari",
      "email": "araguari@gmail.com",
      "telefone": "99999",
      "cep": "38443084"
    }
]</code></pre>
</body>
</html>

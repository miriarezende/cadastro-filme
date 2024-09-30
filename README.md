# Iniciando Projeto

Após clonar o projeto, rode no terminal

```bash
npm i
```

#### Se ocorrer esse erro no Windows
Erro:
```sh
npm : O arquivo <caminhoArquivo>\nodejs\npm.ps1 não pode ser carregado. O arquivo <caminhoArquivo>\nodejs\npm.ps1 não está assinado digitalmente. Não é possível executar este script no sistema atual.
```
Rodar o comando:
```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# em seguida tente novamente

npm i
```

### Conexão com Banco de Dados

Siga o arquivo .env de exemplo para criar o banco de dados.


Em seguida execute o comando no terminal
```bash
npx prisma migrate dev --name init
```

Por fim para visualizar o projeto no localhost execute o comando ``` npm run dev ``` no terminal.

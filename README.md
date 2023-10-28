
# Projeto de Banco de Dados

## Objetivo

Cria uma aplicação web que consuma um banco de dados relacional, com a obrigação de NÃO UTILIZAR ORM (Object Relational Mapping, ou Mapeamento Objeto Relacional) apenas usar os conehcimentos de sql aprenditos nas aulas para criar banco de dados, criar tabelas, inserir dados e fazer as buscas solicitadas.

É necessario ter o mysql instalado na sua maquina e o nodeJs.


## Cuidados iniciais 

- No arquivo ```.envExemple``` mude o nome dele para ```.env```.
- Dentro dele coloque o que se pede nas variaveis de ambiente 
  
            HOST = seu_host # geralmente é o localhost
            USER = seu_usuario # nome do seu usuario no mysql
            PASSWORD = sua_senha # senha do seu usuario no mysql
            DATABASE = seu_banco_de_dados # escolha um nome para seu banco

- Instale as dependencias

        yarn 
        
ou 
        
        npm instal

- Agora execute o seguinte comando para criar o banco de dados e testar a conexão

        yarn db 
        
ou 
        
        npm run db


- Para executar a applicação execute

        yarn dev

ou

        npm run dev


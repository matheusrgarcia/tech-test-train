## Desafio Tech: Pottencial Tech Test Train

[Tech-test-train](https://gitlab.com/Pottencial/tech-test-train)

Esse projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1.
## Servidor de Desenvolvimento

Execute `npm install -g @angular/cli` se você não tem o angular instalado.

Execute `npm install` para instalação de dependências.

Execute `ng serve` para criar um servidor local `http://localhost:4200/`. O aplicativo irá atualizar automaticamente para qualquer alteração.

## Deploy

### Com arquivos minificados

Execute `ng build --prod` Por padrão uma pasta com o nome dist/ no projeto atual será gerada com os arquivos de produção.

## Usando o sistema

Clique no botão `Importar Grafo` e selecione um arquivo contendo um grafo no formato: `'AB2', 'BC3', 'CD5'`, um arquivo de exemplo se encontra na pasta `src/examples` .

O resultados da execução serão exibidos na tela.

## Rodando testes unitários

Execute `ng test` para rodar os testes via [Karma](https://karma-runner.github.io).

Execute `npm run test` ou `yarn test` para rodar os testes via [Karma](https://karma-runner.github.io) com coverage.

## Principios da aplicação

### Componentes e Páginas

- Componentes micro foram colocados em `componentes`.
- Componentes macro foram colocados em `pages`. 

### Models
Só foi necessária a criação de dois models que seriam utilizados como objetos macro na aplicação.
- Grafo
- Edge

### Serviços
Foram criados dois serviços.
- File-manager: Responsável pela leitura do arquivo de texto.
- Graph: Responsável por fazer interface a criação e execução dos métodos do model grafo.
### Roteamento

Foi criada uma rota padrão `/home` para a execução da aplicação, por ser simples apenas uma tela foi necessária para exibir os resultados dos métodos do grafo.

### Testes

Os testes foram feitos com `Jasmine` pois é o padrão do framework e atende perfeitamente neste sentido.
## Mais ajuda

Para ter mais ajuda sobre o CLI do Angular use `ng help` ou cheque a página [Angular CLI](https://angular.io/cli).

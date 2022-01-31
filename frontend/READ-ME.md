# Clone-Olx
    

# Comandos Utilizados
   Criação do projeto:
    - npx create-react-app frontend

   Instalação do Redux
      - npm install redux react-redux --save

   Instalação do Router
      - npm install react-router-dom --save

   Instalação dos componentes de Estilo
      - npm install styled-components --save  (sem utilizar o styled-component será necessário dar className nas div certas para obter o mesmo resultado)

   Instalação de js-cokies
   (Utilizado para verificar através de token se o usuário está ou não logado)
      - npm install js-cookie --save (criar, remover, setar cookies)

   Query String
      - npm install qs --save (utilizado no OlxApi) (recebe um objeto e transforma em querystring)

   Slide Show
      - npm install react-slideshow-image --save

   - npm install react-text-mask text-mask-addons --save --force


# Uso do Redux nesse Projeto
   - Esse projeto não necessita do uso do redux pois não vai ficar trocando informações entre telas. A maioria das coisas virão do WebService.

# DESAFIO
   - Criar a tela "Minha conta"

   # get (retorna as informações do usuário e os anúncios daquele usuário específico)
      /user/me (token)

   # put (alterar informações do ucuário)
      /user/me (token, name, email, state, password)

   # post (alterar informações do anúncio)
      /ad/<id> (token, state, title, category, price, priceNegotiable, description, images, img[])
// Back-end Online
// http://alunos.b7web.com.br:501/ping
// OBS: Você tem a opção de utilizar um back já instalado na máquina
import Cookies from 'js-cookie'
import qs from 'qs'

const BASEAPI = 'http://alunos.b7web.com.br:501'

// ************* REQUISIÇÕES POST ***************
// Login e Cadastro de novos usuários
const apiFetchPost = async (endpoint, body) => {
   //Verifica se o usuário tem algum token no Cookie
   if(!body.token){
      let token = Cookies.get('token');
      if(token){
         body.token = token;
      }
   }

   //Requisição
   const res = await fetch(BASEAPI+endpoint, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body:JSON.stringify(body)
   })
   //Resposta
   const json = await res.json();

   // Caso o usuário não esteja autorizado, ele é direcionado para página de login
   if(json.notallowed){
      window.location.href = '/signin' //redireciona a página atualizando a mesma
      return
   }

   return json;
}

// ************* REQUISIÇÕES GET ***************
// Obter Estados
const apiFetchGet = async (endpoint, body = []) => {
   //Verifica se o usuário tem algum token no Cookie
   if(!body.token){
      let token = Cookies.get('token');
      if(token){
         body.token = token;
      }
   }

   //Requisição
   const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`) //qs = recebe um objeto e transforma em querystring
   //Resposta
   const json = await res.json();

   // Caso o usuário não esteja autorizado, ele é direcionado para página de login
   if(json.notallowed){
      window.location.href = '/signin'
      return
   }

   return json;
}

const OlxApi = {
   // Fazer Login
   login: async (email, password) => {
      //Faz consulta a WebService
      const json = await apiFetchPost(
         '/user/signin',
         {email, password}
      );
      return json;
   },
   //Cadastrar usuário
   register: async (name, email, password, stateLoc) => {
      const json = await apiFetchPost(
         '/user/signup',
         {name, email, password, state: stateLoc}
      );
      return json;
   },
   //Lista de Estados
   getStates: async () => { //Obter os Estados do Brasil
      const json = await apiFetchGet(
         '/states'
      );
      return json.states;
   },
   //Lista de categorias. Ex: Eletronic, baby, etc
   getCategories: async () => {
      const json = await apiFetchGet(
         '/categories',
      );
      return json.categories;
   },
   //Lista de items de anúncio
   getAds: async (options) => {
      const json = await apiFetchGet(
         '/ad/list',
         options
      );
      return json;
   }
};

export default () => OlxApi;
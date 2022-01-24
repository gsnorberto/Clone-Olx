// Back-end Online
// http://alunos.b7web.com.br:501/ping
// OBS: Você tem a opção de utilizar um back já instalado na máquina
import Cookies from 'js-cookie'
import qs from 'qs'

const BASEAPI = 'http://alunos.b7web.com.br:501'

// ************* REQUISIÇÕES POST ***************
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
      window.location.href = '/signin'
      return
   }

   return json;
}

// ************* REQUISIÇÕES GET ***************
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
   login: async (email, password) => {
      //Faz consulta a WebService
      const json = await apiFetchPost(
         '/user/signin',
         {email, password}
      );
      return json;
   }
};

export default () => OlxApi;
//Responsável pelo processo de autenticação

import Cookies from 'js-cookie'

//Verifica se está ou não logado
export const isLogged = () => {
   let token = Cookies.get('token');
   return (token) ? true : false;
}
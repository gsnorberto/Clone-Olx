//Responsável pelo processo de autenticação

import Cookies from 'js-cookie'

// Autenticação. Verifica se está ou não logado
export const isLogged = () => {
   let token = Cookies.get('token');
   return (token) ? true : false;
}

//Fazer Login
//"rememberPassword" é um aviso para informar se será utilizado um cookie com uma extensão (que funcione mesmo fechando o navegador), ou um cookie limitado.
export const doLogin = (token, rememberPassword = false) => {
   if(rememberPassword){
      Cookies.set('token', token, {expires: 999}); //Lembra o login por 999 dias
   } else {
      Cookies.set('token', token); //Dura apenas enquanto o navegador estiver aberto
   }
}

//Processo de Logout - Sair da Conta
export const doLogout = () => {
   //Remover o Cookie é o suficiente para sair da conta
   Cookies.remove('token')
}
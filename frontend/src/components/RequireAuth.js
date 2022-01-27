import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogged } from '../helpers/AuthHandler'

//OBS: é importante lembrar que "chilren" é considerado como uma prop. e "rest" é o restante dessas props. Na rota "/post-an-ad", por exemplo, o "private" e "<AddAd />" são as props. Desse modo o "export default ({children, ...rest})" pode ser alterado para "export default(props)" e as props podem ser acessadas através de "props.children" (que traz o "<AddAd />") e "props.private".
export default ({children, ...rest}) =>{
   let logged = isLogged();
   
   let authorized = (rest.private && !logged) ? false : true;

   if(!authorized){
      return <Navigate to="/signin" />;
   } 

   return children; 
}
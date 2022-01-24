import React, { useState, useEffect } from "react";
import { PageArea } from "./styled"
import useApi from "../../helpers/OlxApi"
import { doLogin } from '../../helpers/AuthHandler'

import { PageContainer, PageTitle, ErrorMessage } from "../../components/MainComponents"

const Page = () => {
   const api = useApi();

   const [name, setName] = useState('');
   const [stateLoc, setStateLoc] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

   const [stateList, setStateList] = useState([]);

   const [disabled, setDisabled] = useState(false);
   const [error, setError] = useState('');

   // Obter os Estados
   useEffect(() => {
      const getStates = async () => {
         const slist = await api.getStates();
         setStateList(slist);
      }
      getStates();
   }, [])

   const handleSubmit = async (e) => {
      e.preventDefault(); //Evita enviar formulário em primeira instância
      setDisabled(true) //Desabitilita os campos
      setError('');

      if( password !== confirmPassword){
         setError('Os campos "senha" e "confirmar senha" não conferem');
         setDisabled(false);
         return;
      }

      //Consulta a WebService
      const json = await api.register(name, email, password, stateLoc);

      if(json.error){ //erro no processo de login
         setError(json.error);
      } else { // Já loga automaticamente depois de realizar o cadastro.
         doLogin(json.token);
         window.location.href = '/';
      }

      setDisabled(false);
   }

   return(
      <PageContainer>
         <PageTitle>Cadastro</PageTitle>
         <PageArea>
            {/* Erro na submissão do formulário */}
            {error &&
               <ErrorMessage>{error}</ErrorMessage>
            }

            <form onSubmit={handleSubmit}>
               <label className="area">
                  <div className="area--title">Nome Completo</div>
                  <div className="area--input">
                     <input
                        type="text" 
                        disabled={disabled} 
                        value={name} 
                        onChange={e=>setName(e.target.value)}
                        required
                     />
                  </div>
               </label>

               <label className="area">
                  <div className="area--title">Estado</div>
                  <div className="area--input">
                     <select required value={stateLoc} onChange={e=>setStateLoc(e.target.value)}>
                        <option></option>
                        {stateList.map((state, key) =>
                           <option key={key} value={state.id}>{state.name}</option>
                        )}
                     </select>
                  </div>
               </label>

               <label className="area">
                  <div className="area--title">Email</div>
                  <div className="area--input">
                     <input
                        type="email" 
                        disabled={disabled} 
                        value={email} 
                        onChange={e=>setEmail(e.target.value)}
                        required
                     />
                  </div>
               </label>

               <label className="area">
                  <div className="area--title">Senha</div>
                  <div className="area--input">
                     <input
                        type="password"
                        disabled={disabled}
                        value={confirmPassword}
                        onChange={e=>setConfirmPassword(e.target.value)}
                        required
                     />
                  </div>
               </label>

               <label className="area">
                  <div className="area--title">Confirmar Senha</div>
                  <div className="area--input">
                     <input
                        type="password"
                        disabled={disabled}
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        required
                     />
                  </div>
               </label>
               
               <label className="area">
                  <div className="area--title"></div>
                  <div className="area--input">
                     <button disabled={disabled}>Cadastrar</button>
                  </div>
               </label>
            </form>
         </PageArea>
      </PageContainer>
   );
}

export default Page;
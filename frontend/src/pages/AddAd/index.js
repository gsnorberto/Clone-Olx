import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { PageArea } from "./styled"
import useApi from "../../helpers/OlxApi"
import MaskedInput from "react-text-mask"
import createNumberMask from "text-mask-addons/dist/createNumberMask"

import { PageContainer, PageTitle, ErrorMessage } from "../../components/MainComponents"

const Page = () => {
   const api = useApi();
   const fileField = useRef();
   const navigate = useNavigate();

   const [title, setTitle] = useState('');
   const [category, setCategory] = useState('');
   const [categories, setCategories] = useState([]);
   const [price, setPrice] = useState('');
   const [priceNegotiable, setPriceNegotiable] = useState(false);
   const [desc, setDesc] = useState('');
   const [disabled, setDisabled] = useState(false);
   const [error, setError] = useState('');

   useEffect(() => {
      const getCategories = async () => {
         const cats = await api.getCategories();
         setCategories(cats)
      }
      getCategories();
   }, [])

   const handleSubmit = async (e) => {
      e.preventDefault(); //Evita enviar formulário em primeira instância
      setDisabled(true) //Desabitilita os campos
      setError('');

      let errors = [];

      //Se não tiver títulos. "trim()" remove os espaços do início e fim do título
      if(!title.trim()){
         errors.push('Preencha o campo Título')
      }
      //Se a categoria não for selecionada
      if(!category){
         errors.push('Preencha o campo Categoria')
      }

      //Se o usuário preencheu os campos
      if(errors.length === 0){
         const fData = new FormData();
         fData.append('title', title);
         fData.append('price', price);
         fData.append('priceneg', priceNegotiable);
         fData.append('desc', desc);
         fData.append('cat', category);

         //verificar se o usuário selecionou imagens
         if(fileField.current.files.length > 0){
            for(let i=0; i<fileField.current.files.length; i++){
               fData.append('img', fileField.current.files[i]);
            }
         }

         const json = await api.addAd(fData);

         if(!json.error){
            navigate.push(`/ad/${json.id}`) //manda para o próprio anúncio
            return;
         } else {
            setError(json.error)
         }
      } else {
         setError(errors.join("\n"))
      }

      setDisabled(false) 
   }

   const priceMask = createNumberMask({
      prefix: 'R$ ',
      includeThousandsSeparator: true,
      thousandsSeparatorSymbol: '.',
      allowDecimal: true,
      decimalSymbol: ','
   })

   return(
      <PageContainer>
         <PageTitle>Postar Anúncio</PageTitle>
         <PageArea>
            {/* Erro na submissão do formulário */}
            {error &&
               <ErrorMessage>{error}</ErrorMessage>
            }
            <form onSubmit={handleSubmit}>
               <label className="area">
                  <div className="area--title">Titulo</div>
                  <div className="area--input">
                     <input
                        type="text" 
                        disabled={disabled} 
                        value={title} 
                        onChange={e=>setTitle(e.target.value)}
                        required
                     />
                  </div>
               </label>
               <label className="area">
                  <div className="area--title">Categoria</div>
                  <div className="area--input">
                     <select
                        disabled={disabled}
                        onChange={e=>setCategory(e.target.value)}
                        required
                     >
                        <option></option>
                        {categories && categories.map((category, key)=>
                           <option key={key} value={category.id}>{category.name}</option>
                        )}
                     </select>
                  </div>
               </label>
               <label className="area">
                  <div className="area--title">Preço</div>
                  <div className="area--input">
                     <MaskedInput
                        mask={priceMask}
                        placeholder="R$ "
                        disabled={disabled || priceNegotiable}
                        value={price}
                        onChange={e=>setPrice(e.target.value)}
                     />
                  </div>
               </label>
               <label className="area">
                  <div className="area--title">Preço Negociável</div>
                  <div className="">
                     <input
                        type="checkbox"
                        disabled={disabled}
                        checked={priceNegotiable}
                        onChange={e=>setPriceNegotiable(!priceNegotiable)}
                     />
                  </div>
               </label>
               <label className="area">
                  <div className="area--title">Descrição</div>
                  <div className="area--input">
                     <textarea
                        disabled={disabled}
                        value={desc}
                        onChange={e=>setDesc(e.target.value)}
                     /> 
                  </div>
               </label>
               <label className="area">
                  <div className="area--title">Imagens (1 ou mais)</div>
                  <div className="area--input">
                     <input
                        type="file"
                        disabled={disabled}
                        ref={fileField}
                        multiple
                     />
                  </div>
               </label>
               <label className="area">
                  <div className="area--title"></div>
                  <div className="area--input">
                     <button disabled={disabled}>Criar Anúncio</button>
                  </div>
               </label>
            </form>
         </PageArea>
      </PageContainer>
   );
}

export default Page;
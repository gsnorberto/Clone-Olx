//Página com anúncios filtrados

import React, { useState, useEffect } from "react";
import { PageArea } from "./styled"
import useApi from "../../helpers/OlxApi"
import { useLocation, useHistory } from 'react-router-dom';



import { PageContainer } from "../../components/MainComponents"
import AdItem from "../../components/partials/AdItem"

const Page = () => {
   const api = useApi();

   // Manda um objeto que consegue pegar cada um dos itens da querystring
   const useQueryString = () => {
      return new URLSearchParams(useLocation().search);
   };
   const query = useQueryString();
   // "http://localhost:3000/ads?cat=cars"
   //alert(useLocation().search) //pega toda da queryString. Ex: "?cat=cars"
   //alert(query.get('cat')) //pega o nome da categoria do item clicado

   //Valor digitado pelo usuário no input da página "Home"
   const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '');
   const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '');
   //Select do Estado na página "Home"
   const [stateLoca, setStateLoca] = useState(query.get('state') != null ? query.get('state') : '');


   const [stateList, setStateList] = useState([]);
   const [categories, setCategories] = useState([]);
   const [adList, setAdlist] = useState([]);

   //Carregar lista de Estados
   useEffect(() => {
      const getStates = async () => {
         const slist = await api.getStates();
         setStateList(slist)
      }
      getStates();
   }, [])

   //Carregar lista de categorias
   useEffect(() => {
      const getCategories = async () => {
         const cats = await api.getCategories();
         setCategories(cats)
      }
      getCategories();
   }, [])

   //Carregar posts/anúncios
   useEffect(() => {
      const getRecentAds = async () => {
         const json = await api.getAds({
            sort: 'desc', //Ordena os itens pelos os mais recentes primeiro
            limit: 8  //limite de itens por págine
         });
         setAdlist(json.ads)
      }
      getRecentAds();
   }, [])

   return (
      <PageContainer>
         <PageArea>
            <div className="leftSide">
               <form method="GET">
                  {/* ******* Campos de entrada ******* */}
                  <input
                     type="text"
                     name="q"
                     placeholder="O que você procura?"
                     value={q}
                  />

                  <div className="filterName">Estado: </div>
                  {console.log(stateLoca)}
                  <select name="state">
                     <option></option>
                     {stateList.map((state, key) =>
                        <option key={key} value="state.name">{state.name}</option>
                     )}
                  </select>
                  {/* *********** Categoria *********** */}
                  <div className="filterName">Categoria: </div>
                  <ul>
                     {categories.map((category, key) =>
                        <li key={key} className={cat == category.slug ? 'categoryItem active' : 'categoryItem'}>
                           <img src={category.img} alt="" />
                           <span>{category.name}</span>
                        </li>
                     )}
                  </ul>
               </form>
            </div>
            <div className="rightSide">
               ...
            </div>
         </PageArea>
      </PageContainer>
   );
}

export default Page;
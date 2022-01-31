import React, { useState, useEffect } from "react";
import { SearchArea, PageArea } from "./styled"
import useApi from "../../helpers/OlxApi"
import {Link} from "react-router-dom"


import { PageContainer } from "../../components/MainComponents"
import AdItem from "../../components/partials/AdItem"

const Page = () => {
   const api = useApi();

   const [stateList, setStateList] = useState([]);
   const [categories, setCategories] = useState([]);
   const [adList, setAdlist] = useState([]);

   // ***********  Carregar lista de Estados ************
   useEffect(() => {
      const getStates = async () => {
         const slist = await api.getStates();
         setStateList(slist)
      }
      getStates();
   }, [])

   // **********  Carregar lista de Categorias **********
   //Carregar lista de categorias
   useEffect(() => {
      const getCategories = async () => {
         const cats = await api.getCategories();
         setCategories(cats)
      }
      getCategories();
   }, [])

   // ************  Carregar posts/anúncios *************
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
      <>
         <SearchArea>
            <PageContainer>
               {/* ********* CAIXA DE PESQUISA ********* */}
               <div className="searchBox">
                  <form method="GET" action="/ads">
                     <input type="text" name="q" placeholder="O que você procura?" />
                     <select name="state">
                        {stateList.map((state, key) =>
                           <option key={key} value={state.name}>{state.name}</option>
                        )}
                     </select>
                     <button>Pesquisar</button>
                  </form>
               </div>
               {/* ************* CATEGORIAS ************* */}
               <div className="categoryList">
                  {categories.map((category, key) =>
                     <Link key={key} to={`/ads?cat=${category.slug}`} className="categoryItem">
                        <img src={category.img} alt="" />
                        <span>{category.name}</span>
                     </Link>
                  )}
               </div>
            </PageContainer>
         </SearchArea>

         <PageContainer>
            <PageArea>
               <h2>Anúncios Recentes</h2>
               <div className="list">
                     {adList.map((itemList, key)=>
                        <AdItem key={key} data={itemList} />
                     )}
               </div>
               <Link to="/ads" className="seeAllLink">Ver Todos </Link>
               <hr />
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </PageArea>
         </PageContainer>
      </>
   );
}

export default Page;
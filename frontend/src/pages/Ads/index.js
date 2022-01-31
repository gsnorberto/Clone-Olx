//Página com anúncios filtrados

import React, { useState, useEffect } from "react";
import { PageArea } from "./styled"
import useApi from "../../helpers/OlxApi"
import { useLocation, useNavigate } from 'react-router-dom';

import { PageContainer } from "../../components/MainComponents"
import AdItem from "../../components/partials/AdItem"
let timer;

const Page = () => {
   const api = useApi();
   const navigate = useNavigate();

   // Retorna um objeto com cada um dos itens da querystring
   const useQueryString = () => {
      return new URLSearchParams(useLocation().search);
   };
   const query = useQueryString();

   // *************************************************
   // ******************** STATES *********************
   // *************************************************
   /**
    * "http://localhost:3000/ads?cat=cars"
    * alert(useLocation().search) //pega toda da
    * queryString. Ex: "?cat=cars"
    * alert(query.get('cat')) //pega o nome da categoria 
    * do item clicado
    * Valor digitado pelo usuário no input da página 
    * "Home" é enviado pela queryString e acessada pela 
    * "query.get"
    */
   //PRODUTO QUE O USUÁRIO PROCURA
   const [q, setQ] = useState(
      query.get('q') != null ? query.get('q') : ''
   );
   //CATEGORIA (ELETRONICS, CLOTHES ...)
   const [cat, setCat] = useState(
      query.get('cat') != null ? query.get('cat') : ''
   );
   //ESTADO (SP, PB ...)
   const [stateLoca, setStateLoca] = useState(
      query.get('state') != null ? query.get('state') : ''
   );
   
   //TOTAL DE ANÚNCIOS
   const [adstotal, setAdstotal] = useState(0);
   //TOTAL DE PÁGINAS
   const [pageCount, setPageCount] = useState(0);
   //PAGINA ATUAL
   const [currentPage, setCurrentPage] = useState(1);
   
   //ESTADOS (LISTA)
   const [stateList, setStateList] = useState([]);
   //CATEGORIAS (LISTA)
   const [categories, setCategories] = useState([]);
   //ANÚNCIOS (LISTA)
   const [adList, setAdlist] = useState([]);
   
   //OPACIDADE DOS ANÚNCIOS (DURANTE E NO TÉRMINO DE CARREGAMENTO)
   const [resultOpacity, setResultOpacity] = useState(1);
   //ESTADO DO CARREGAMENTO
   const [loading, setLoading] = useState(true);

   // ********************** // ************************

   // *************************************************
   // *********** OBTER LISTA DE ANÚNCIOS *************
   // *************************************************
   const getAdsList = async () => {
      setLoading(true);
      
      //POSIÇÃO DO PRIMEIRO ELEMENTO DA PÁGINA CORRESPONDENTE
      //Pag. atual - 1 (conta a partir do 0) * qnt.itens/pag (deve ser igual ao "limit")
      let offset = (currentPage - 1) * 3;
      /**
       * sort = Ordena os itens pelos os mais recentes
       * limit = Limite de itens por págine
       * q, cat, stateLoca = Filtragem na Pesquisa
       * offset = pula uma quantidade de anúncios baseado
       * na quantidade de anúncios que há
       */
      const json = await api.getAds({
         sort: 'desc',
         limit: 3,
         q,
         cat,
         stateLoca,
         offset
      });
      setAdlist(json.ads); //Traz a lista com todos os itens
      setAdstotal(json.total); //Total de itens para exibir
      setResultOpacity(1); //Remove a opacidade
      setLoading(false); //Remove mensagem de carregamento
   }
   // ********************** // ************************

   // *************************************************
   // ******************** EFFECTS ********************
   // *************************************************

   //CALCULAR QUANTIDADE DE PÁGINAS DOS RESULTADOS DA BUSCA
   useEffect(() => {
      if (adList.length > 0) {
         setPageCount(Math.ceil(adstotal / adList.length))
      } else {
         setPageCount(0)
      }
   }, [adstotal]);

   //OBTER LISTA COM TODOS ANÚNCIOS
   useEffect(() => {
      getAdsList();
      setResultOpacity(0.3);
   }, [currentPage]);

   // MODIFICA A QUERY STRING DA URL A CADA MODIFICAÇÃO NOS INPUTS
   useEffect(() => {
      let queryString = []

      if (q) {
         queryString.push(`q=${q}`)
      }
      if (cat) {
         queryString.push(`cat=${cat}`)
      }
      if (stateLoca) {
         queryString.push(`stateLoca=${stateLoca}`)
      }

      if (timer) {
         clearTimeout(timer)
      }

      /** Timer para impedir requisições instantâneas
       * ao servidor toda vez que o usuário digita
       * uma letra no campo de busca
       */
      timer = setTimeout(getAdsList, 2000)
      setResultOpacity(0.3);
      navigate(`?${queryString.join('&')}`, { replace: true })
      setCurrentPage(1);
   }, [q, cat, stateLoca]);
   
   // CARREGA LISTA DE ESTADOS
   useEffect(() => {
      const getStates = async () => {
         const slist = await api.getStates();
         setStateList(slist)
      }
      getStates();
   }, [])

   // CARREGAR LISTA DE CATEGORIAS
   useEffect(() => {
      const getCategories = async () => {
         const cats = await api.getCategories();
         setCategories(cats)
      }
      getCategories();
   }, [])
   
   // ARRAY COM A NÚMERAÇÃO DE CADA PÁGINA (1,2,3...)
   let pagination = []
   for (let i = 1; i <= pageCount; i++) {
      pagination.push(i)
   }
   // ********************** // ************************

   return (
      <PageContainer>
         <PageArea>
            <div className="leftSide">
               <form method="GET">
                  {/* ****** CAMPO DE DIGITAÇÃO ******* */}
                  <input
                     type="text"
                     name="q"
                     placeholder="O que você procura?"
                     value={q}
                     onChange={e => setQ(e.target.value)}
                  />
                  {/* ******** SELEÇÃO DE ESTADO ******* */}
                  <div className="filterName">Estado: </div>
                  <select name="state" value={stateLoca} onChange={e => setStateLoca(e.target.value)}>
                     <option></option>
                     {stateList.map((state, key) =>
                        <option key={key} value={state.name}>{state.name}</option>
                     )}
                  </select>
                  {/* *********** CATEGORIA ************ */}
                  <div className="filterName">Categoria: </div>
                  <ul>
                     {categories.map((category, key) =>
                        <li
                           key={key}
                           className={cat === category.slug ? 'categoryItem active' : 'categoryItem'}
                           onClick={() => setCat(category.slug)}
                        >
                           <img src={category.img} alt="" />
                           <span>{category.name}</span>
                        </li>
                     )}
                  </ul>
               </form>
            </div>
            <div className="rightSide">
               <h2>Resultados</h2>

               {loading && adList.length === 0 &&
                  <div className="listWarning">Carregando...</div>
               }
               {!loading && adList.length === 0 &&
                  <div className="listWarning">Não encontramos resultados</div>
               }

               <div className="list" style={{ opacity: resultOpacity }}>
                  {adList.map((ad, key) =>
                     <AdItem key={key} data={ad} />
                  )}
               </div>

               <div className="pagination">
                  {pagination.map((pageNum, key) =>
                     <div
                        key={key}
                        className={pageNum === currentPage ? 'pageItem active' : 'pageItem'}
                        onClick={() => setCurrentPage(pageNum)}
                     > {pageNum} </div>
                  )}
               </div>
            </div>
         </PageArea>
      </PageContainer>
   );
}

export default Page;
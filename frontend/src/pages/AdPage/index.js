import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import { PageArea, Fake, OthersArea, BreadChumb } from "./styled"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import useApi from "../../helpers/OlxApi"


import { PageContainer } from "../../components/MainComponents"
import AdItem from "../../components/partials/AdItem"

const Page = () => {
   const api = useApi();
   const { id } = useParams(); //pega o id do item que está na url

   const [loading, setLoading] = useState(true);
   const [adInfo, setAdInfo] = useState({});

   useEffect(() => {
      const getAdInfo = async (id) => {
         const json = await api.getAd(id, true); //"true" = mostrar mais anúncios do mesmo vendedor na parte inferior da página.
         setAdInfo(json);
         setLoading(false);
      }
      getAdInfo(id);
   }, []);

   const formatDate = (date) => {
      let cDate = new Date(date);
      let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

      let cDay = cDate.getDate();
      let cMonth = cDate.getMonth();
      let cYear = cDate.getFullYear();

      return `${cDay} de ${months[cMonth]} de ${cYear}`
   }

   return (
      <PageContainer>

         {adInfo.category &&
            <BreadChumb>
               <Link to="/">Home</Link> /
               <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link> /
               <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link> / {adInfo.title}
            </BreadChumb>
         }

         <PageArea>
            {/* *********** LEFT SIDE OF THE PAGE *********** */}
            <div className="leftSide">
               <div className="box">
                  <div className="adImage">
                     {loading && <Fake height={300} />}
                     {adInfo.images &&
                        <Slide>
                           {adInfo.images.map((slideImage, index) => (
                              <div key={index} className="each-slide">
                                 <img src={slideImage} alt="" />
                              </div>
                           ))}
                        </Slide>
                     }
                  </div>

                  <div className="adInfor">
                     <div className="adName">
                        {loading && <Fake height={20} />}
                        {adInfo.title &&
                           <h2>{adInfo.title}</h2>
                        }
                        {adInfo.dateCreated &&
                           <small>Criado em: {formatDate(adInfo.dateCreated)} </small>
                        }
                     </div>
                     <div className="adDescription">
                        {loading && <Fake height={100} />}
                        {adInfo.description} <hr />
                        {adInfo.views &&
                           <small>Visualizações: {adInfo.views}</small>
                        }
                     </div>
                  </div>
               </div>
            </div>

            {/* *********** RIGHT SIDE OF THE PAGE *********** */}
            <div className="rightSide">
               <div className="box box-padding">
                  {loading && <Fake height={20} />}
                  {adInfo.priceNegotiable &&
                     "Preço Negociável"
                  }
                  {!adInfo.priceNegotiable && adInfo.price &&
                     <div className="price">Preço: <span>R${adInfo.price}</span></div>
                  }
               </div>
               {loading && <Fake height={50} />}
               {adInfo.userInfo &&
                  <>
                     <a href={`mailto:${adInfo.userInfo.email}`} target="_blank" className="contactSellerLink">Fale com o Vendedor</a>
                     <div className="box box-padding createdBy">
                        <strong>{adInfo.userInfo.name}</strong>
                        <small>E-mail: {adInfo.userInfo.email}</small>
                        <small>Estado: {adInfo.stateName}</small>
                     </div>
                  </>
               }
            </div>
         </PageArea>
         {/* *********** OUTROS ANÚNCIOS *********** */}
         <OthersArea>
            {adInfo.others &&
               <>
                  <h2>Outras Ofertas do Vendedor</h2>
                  <div className="list">
                     {adInfo.others.map((itemList, key) =>
                        <AdItem key={key} data={itemList} />
                     )}
                  </div>
               </>
            }
         </OthersArea>
      </PageContainer>
   );
}

export default Page;
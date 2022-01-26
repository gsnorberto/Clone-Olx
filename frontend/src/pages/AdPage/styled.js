import styled from 'styled-components'

// Utiliza-se o "Fake" enquanto a página estiver em carregamento.
export const Fake = styled.div`
   background-color: #DDDDDD;
   height: ${props=>props.height || 20}px;
`

export const PageArea = styled.div`
   display: flex;
   margin-top: 20px;

   .box{
      background-color: #FFFFFF;
      border-radius: 5px;
      box-shadow: 0 0 4px #999999;
      margin-bottom: 20px;
      padding: 10px;
   }

   .box-padding{
      padding: 10px;
   }

   .leftSide{
      flex:1;
      margin-right:20px;

      .box{
         display: flex;
      }

      .adImage {
         height: 320px;
         width: 320px;
         margin-right: 20px;

         .each-slide img {
            display: flex;
            justify-content: center;
            align-items: center;
            background-size:cover;
            height: 320px;
         }
      }

      .adInfor{
         flex: 1;

         .adName{
            margin-bottom: 20px;

            h2{
               margin: 0;
               margin-top: 20px;
            }
            small{
               color: #999999;
            }
         }

         .adDescription{
            small{
               color: #999999;
            }
         }
      }
   }
   .rightSide{
      width: 250px;

      .price span{
         color: #0000FF;
         display: block;
         font-size: 27px;
         font-weight: bold;
      }

      .contactSellerLink{
         background-color: #0000FF;
         color: #FFFFFF;
         height: 30px;
         border-radius: 5px;
         box-shadow: 0 0 4px #999999;
         display: flex;
         justify-content: center;
         align-items: center;
         text-decoration: none;
         margin-bottom: 20px;
      }
      
      .createdBy small{
         display: block;
         color: #999999;
         margin-top: 10px;
      }
   }
`;

export const OthersArea = styled.div`
   h2 {
      font-size: 20px
   }

   .list{
      display: flex;
      flex-wrap: wrap;

      .aditem{
         width: 25%;
         
      }
   }
`

export const BreadChumb = styled.div`
   font-size: 13px;
   margin-top: 20px;

   a{
      display: inline-block;
      margin: 0px 5px;
      text-decoration: underline;
      color: #000000;
   }
`
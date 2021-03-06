import styled from 'styled-components'

export const HeaderArea = styled.div`
   background-color: #FFFFFF;
   height: 60px;
   border-bottom: 1px solid #CCCCCC;

   .container {
      max-width: 1000px;
      margin: auto;
      display: flex;
   }

   a {
      text-decoration: none;
   }

   .logo {
      flex:1;
      display: flex;
      align-items: center;
      height: 60px;

      .logo-1,
      .logo-2,
      .logo-3 {
         font-size: 27px;
         font-weight: bold;
      }
      .logo-1 { color: #FF0000; }
      .logo-2 { color: #00FF00; }
      .logo-3 { color: #0000FF; }
   }

   nav{
      padding-top: 10px;
      padding-bottom: 10px;

      ul, li {
         margin: 0;
         padding: 0;
         list-style: none;
      }
      ul{
         display: flex;
         align-items: center;
         height: 40px;
      }
      li{
         margin-left: 10px;
         margin-right: 10px;

         a, button{
            border: 0;
            background: none;
            cursor: pointer;
            outline: 0;
            color: #000000;
            font-size: 14px;
            text-decoration: none;

            &:hover{
               color: #999999;
            }

            &.button{
               background-color: #FF8100;
               border-radius: 4px;
               color: #FFFFFF;
               padding: 5px 10px;

               &:hover{
                  background-color: #E57706;
               }
            }
         }
      }
   }

@media (max-width: 600px){
   /* O próprio item */
   &{
      height: auto;
   }
   
   .container{
      flex-direction: column;

      .logo{
         justify-content: center;
         margin: 20px 0;
      }

      nav ul{
         flex-direction: column;
         height: auto;
      }
      nav li{
         margin: 5px 0;
      }
   }

}
`;
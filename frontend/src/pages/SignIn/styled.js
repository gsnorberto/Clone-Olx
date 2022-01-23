import styled from 'styled-components'

export const PageArea = styled.div`
   form {
      background-color: #FFFFFF;
      border-radius: 3px;
      padding: 10px;
      box-shadow: 0px 0px 3px #999999;

      .area {
         display: flex;
         align-items: center;
         padding: 10px;
         max-width: 500px;

         .area--title{
            width: 200px;
            text-align: right;
            padding-right: 20px;
            font-weight: bold;
            font-size: 14px;
         }
         .area--input{
            flex: 1;

            input{
               width: 100%;
               font-size: 14px;
               padding: 5px;
               border: 1px solid #DDDDDD;
               border-radius: 3px;
               outline: 0;
               transition: all ease .4s;

               &:focus{
                  border: 1px solid #333333;
                  color: #333333;
               }
            }
         }

         button{
            background-color: #0089FF;
            color: #FFFFFF;
            padding: 5px 10px;
            border: 0;
            outline: 0;
            border-radius: 4px;
            font-size: 15px;
            cursor:pointer;

            &:hover{
               background-color: #006FCE;
            }
         }
      }
   }
`;
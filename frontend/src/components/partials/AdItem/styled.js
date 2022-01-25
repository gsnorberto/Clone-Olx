import styled from 'styled-components'

export const Item = styled.div`
   a{
      display: block;
      border: 1px solid #FFFFFF;
      margin: 10px;
      text-decoration: none;
      padding: 10px;
      border-radius: 5px;
      color: #000000;
      background-color: #FFFFFF;
      transition: all ease 0.2s;

      &:hover{
         background-color: #EEEEEE;
         border: 1px solid #CCCCCC;
      }

      .itemImage img{
         width:100%;
         border-radius: 5px;
      }

      .itemName {
         font-weight: bold;
      }

   }
`;
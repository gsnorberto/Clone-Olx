import React from "react";
import { FooterArea } from './styled';
import { PageContainer } from '../../MainComponents'

const Footer = () => {
   return (
      <FooterArea>
         <PageContainer>
            <div className="footer">Todos os direitos reservados</div>
         </PageContainer>
      </FooterArea>
   )
}

export default Footer;
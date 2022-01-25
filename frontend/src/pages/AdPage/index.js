import React, { useState } from "react";
import { PageArea } from "./styled"
import useApi from "../../helpers/OlxApi"


import { PageContainer,} from "../../components/MainComponents"

const Page = () => {
   const api = useApi();


   return(
      <PageContainer>
         <PageArea>
            ...
         </PageArea>
      </PageContainer>
   );
}

export default Page;
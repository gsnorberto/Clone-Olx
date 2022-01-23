import React from 'react';
import { Link } from 'react-router-dom'

const Page = () => {
   return (
      <div>
         <h1>
            error 404: page not found
         </h1>
         <Link to='/'>Voltar para Home</Link>
      </div>
   );
}

export default Page;
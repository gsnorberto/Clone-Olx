//Criação para uma eventual necessidade futura.

const initialState = {
   email:''
}

export default (state = initialState, action) => {

   if(action.type === 'SET_EMAIL'){
      return {...state, email: action.payload.email}
   }

   return state;
}
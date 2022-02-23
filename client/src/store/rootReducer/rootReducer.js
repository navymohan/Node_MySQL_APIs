export const TOKEN = 'TOKEN';
export const STORETOKEN = 'STORETOKEN';

const initialState = {
    token : ''
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    
  case STORETOKEN:
    return {token : payload }

  default:
    return state
  }
}

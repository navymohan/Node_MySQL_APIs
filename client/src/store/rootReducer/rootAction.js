import {TOKEN ,STORETOKEN} from './rootReducer'

export const storeToken = (payload) => ({
  type: STORETOKEN,
  payload
})
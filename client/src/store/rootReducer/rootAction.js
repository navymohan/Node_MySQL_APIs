import axios from 'axios'
import {TOKEN ,STORETOKEN} from './rootReducer'

export const storeToken = (payload) => ({
  type: STORETOKEN,
  payload
})


export const fetchAllToken = async (payload) => {
    data = await axios.get('blah blah');
}



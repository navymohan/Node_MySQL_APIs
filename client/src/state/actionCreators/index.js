export const storeToken = (token) => {
    return (dispatch) => {
        dispatch({
            type: 'storeToken',
            payload: token
        })
    }
}

export const getToken = () => {
    return (dispatch) => {
        dispatch({
            type: 'getToken'
        })
    }
}
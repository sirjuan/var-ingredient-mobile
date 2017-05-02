
export const getHeaders = () => (dispatch, getState) => {
    return { headers: { 'Authorization': getState().session.token }}
}

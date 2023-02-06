export const getLocalStorage = () => {
    let token = JSON.parse(localStorage.getItem('userToken')) || []
    return token
}
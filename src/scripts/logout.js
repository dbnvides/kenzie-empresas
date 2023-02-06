import { getLocalStorage } from "./localstorage.js"

function logout() {
    const logout = document.querySelector('#log-out')

    logout.addEventListener('click', () => {
        localStorage.removeItem('userToken')

        verifyPermission()
    })
}

const verifyPermission = () => {
    const user = getLocalStorage()
    
    if (user == '') {
        window.location.replace('../Login/login.html')
    }
}

verifyPermission()
export { logout }
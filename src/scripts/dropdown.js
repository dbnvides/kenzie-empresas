export function dropDown() {
    const buttonMenuDropDown = document.querySelector('.drop-down')
    const nav = document.querySelector('.nav-menu')
    nav.classList.toggle('menu-active')
    buttonMenuDropDown.classList.toggle('drop-down-active')
    buttonMenuDropDown.addEventListener('click', dropDown)
}

dropDown()
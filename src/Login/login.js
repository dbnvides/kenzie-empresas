import { getValidationUser, setlogin } from "../scripts/requests.js"
import {dropDown} from '../scripts/dropdown.js'

const eventLogin = () => {

    const form = document.querySelector('.form-login')
    const elements = [...form.elements]
    const btnLogin = document.querySelector('.button-login')
    
    validatioButton()

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const body = {}

        elements.forEach((element) =>{
            
            if(element.tagName == 'INPUT' && element.value !== ''){
                body[element.id] = element.value
            }
        })

        await setlogin(body)
        
    })


}

function validatioButton() {
    const InputEmail = document.querySelector('#email')
    const InputPasswd = document.querySelector('#password')
    const buttonAcess = document.querySelector('.button-login')
    const form = document.querySelector('.form-login')

    buttonAcess.disabled = true

    form.addEventListener('input', async (e) => {
        e.preventDefault()

        if (InputEmail.value !== '' && InputPasswd.value !== '') {
            buttonAcess.disabled = false
            buttonAcess.classList.remove('button-desable')
        }else{
            buttonAcess.disabled = true
            buttonAcess.classList.add('button-desable')
        }

    })

}



dropDown()
eventLogin()
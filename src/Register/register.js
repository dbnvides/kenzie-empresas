import { setRegister } from "../scripts/requests.js"
import { dropDown } from '../scripts/dropdown.js'

dropDown()

const eventRegister = () => {
    const form = document.querySelector('.form-register')
    const elements = [...form.elements]

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        let body = {}

        elements.forEach((elem) => {

            if (elem.tagName == 'INPUT' && elem.value !== '') {

                body[elem.id] = elem.value

            }
            if(elem.tagName == 'SELECT' && elem.value !== 'default'){
                body[elem.id] = elem.value
            }
        })
        await setRegister(body)

    })
}

eventRegister()
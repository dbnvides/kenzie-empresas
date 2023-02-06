import { dropDown } from "../scripts/dropdown.js";
import { editProfileUserPerfil, getCoWorks, getInfUser, getInfUSerCompany } from "../scripts/requests.js";
import {logout} from '../scripts/logout.js'

dropDown()

const renderJobInScreen = async () => {

    const infUser = await getInfUser()
    const empytDisplay = document.querySelector('.empyt-list')
    const employee = document.querySelector('.employee')
    const nameCompanyProfile = document.querySelector('#nameCompany')
    const nameDepartmentProfile = document.querySelector('#nameDepartment')
    const btnUserEdit = document.querySelector('#btn-user-edit')


    btnUserEdit.addEventListener('click', async () => {
        modalEditProfileUser()
    })

    if (infUser.department_uuid !== null && infUser.department_uuid !== undefined) {
        employee.style.display = 'flex'
        empytDisplay.style.display = 'none'
        nameCompanyProfile.innerText = await verificationCompany()
        nameDepartmentProfile.innerText = await verificationDepartment(infUser.department_uuid)
        listCoWorks()
    } else {
        employee.style.display = 'none'
        empytDisplay.style.display = 'flex'
    }
}

const verificationCompany = async () => {
    let name = await getInfUSerCompany()
    return name.name
}

const verificationDepartment = async (uuid) => {
    let company = await getInfUSerCompany()

    let name

    company.departments.forEach(element => {
        if (element.uuid == uuid) {
            return name = element.name
        }
    });
    return name
}

const listCoWorks = async () => {
    let coworkers = await getCoWorks()

    coworkers.forEach(user => {
        renderListCoWork(user.users)
    })

}

const renderListCoWork = async (list) => {
    const ul = document.querySelector('.list-co-work')
    let infUser = await getInfUser()

    list.forEach(element => {
        if(element.uuid !== infUser.uuid){

            ul.append(createListCoWork(element))
        }
    })

}

const createListCoWork = ({ username, professional_level }) => {

    let li = document.createElement('li')

    let name = document.createElement('p')
    name.classList.add('name-title')
    name.innerText = username

    let level = document.createElement('p')
    level.id = 'coWorkLevel'
    level.innerText = professional_level

    li.append(name, level)
    return li
}

const renderUserInf = async () => {
    const infUser = await getInfUser()
    const ul = document.querySelector('.list-inf-profile')
    ul.innerHTML = ''
    ul.append(createInfProfile(infUser))
}

const createInfProfile = ({ username, email, professional_level, kind_of_work }) => {
    let li = document.createElement('li')
    const userName = document.querySelector('#username')

    userName.innerText = username

    let userEmail = document.createElement('span')
    userEmail.id = 'email'
    userEmail.innerText = `Email: ${email}`

    let level = document.createElement('p')
    level.id = 'level'
    
    if (professional_level !== null) {
        let levelName = professional_level[0].toUpperCase() + professional_level.substring(1)
        level.innerText =levelName
    }

    let modality = document.createElement('p')
    modality.id = 'modality'
    if (kind_of_work !== null) {
        modality.innerText = kind_of_work
    }

    li.append(userEmail, level, modality)
    return li
}

const openModal = (children) => {
    const body = document.querySelector('body')

    const modalWrapper = document.createElement('div')
    modalWrapper.classList.add('modal-wrapper')

    const modal = document.createElement('div')
    modal.classList = 'modal little-modal'

    const buttonClose = document.createElement('button')
    buttonClose.classList.add('modal-close')

    buttonClose.innerText = 'X'

    buttonClose.addEventListener('click', () => {
        modalWrapper.remove()
    })

    modal.appendChild(buttonClose)
    modal.append(children)
    modalWrapper.appendChild(modal)
    body.appendChild(modalWrapper)

}

const modalEditProfileUser = () => {

    let container = document.createElement('div')
    container.classList.add('container-modal')

    let title = document.createElement('h2')
    title.innerText = 'Editar Perfil'

    let form = document.createElement('form')
    form.classList.add('form-modal')
    form.id = 'form-edit-perfil'

    let inputName = document.createElement('input')
    inputName.classList.add('input-default')
    inputName.setAttribute('placeholder', 'Seu nome')
    inputName.id = 'username'

    let inputEmail = document.createElement('input')
    inputEmail.classList.add('input-default')
    inputEmail.id = 'email'
    inputEmail.setAttribute('placeholder', 'Seu email')
    inputEmail.setAttribute('type', 'email')

    let inputPasswd = document.createElement('input')
    inputPasswd.classList.add('input-default')
    inputPasswd.id = 'password'
    inputPasswd.setAttribute('placeholder', 'Sua senha')
    inputPasswd.setAttribute('type', 'password')

    let buttonEdit = document.createElement('button')
    buttonEdit.classList = 'button-default btn-link'
    buttonEdit.setAttribute('type', 'submit')
    buttonEdit.id = 'btn-edit-user'
    buttonEdit.innerText = 'Editar Perfil'

    eventEditProfileUser(form)

    form.append(inputName, inputEmail, inputPasswd, buttonEdit)
    container.append(title, form)

    openModal(container)
}

const eventEditProfileUser = async (form) => {


    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const modal = document.querySelector('.modal-wrapper')
        let elements = [...form.elements]
        let body = {}

        elements.forEach((elem) => {
            if (elem.tagName == 'INPUT' && elem.value !== '') {
                body[elem.id] = elem.value
            }
        })
        await editProfileUserPerfil(body)
        modal.remove()
        await renderUserInf()
    })
}

logout()
await renderUserInf()
renderJobInScreen()
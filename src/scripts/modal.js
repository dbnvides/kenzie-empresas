import { departmentsList, nameCompanyUser, renderUsers } from "../AdmPage/admPage.js"
import { contractUserAdm, createDepartment, deleteDepartment, deleteUser, editDepartment, editProfileUser, getCompanies, listAllUsers, listAllUsersNoWorkDepartment, offEmployee } from "./requests.js"

const body = document.querySelector('body')

const openModal = (children) => {

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

const openDeleteModal = (children) => {

    const modalWrapper = document.createElement('div')
    modalWrapper.classList.add('modal-wrapper')

    const modal = document.createElement('div')
    modal.classList = 'modal'

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

const openViewerAdmModal = (children) => {
    const modalWrapper = document.createElement('div')
    modalWrapper.classList.add('modal-wrapper')

    const modal = document.createElement('div')
    modal.classList = 'modal modal-adm-viewer'

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

const modalCreateDepartment = async () => {

    let container = document.createElement('div')
    container.classList.add('container-modal')

    let title = document.createElement('h2')
    title.innerText = 'Criar Departamento'

    let form = document.createElement('form')
    form.classList.add('form-modal')
    form.id = 'form-create-department'

    let inputName = document.createElement('input')
    inputName.classList.add('input-default')
    inputName.setAttribute('placeholder', 'Nome do departamento')
    inputName.id = 'name'

    let inputDescription = document.createElement('input')
    inputDescription.classList.add('input-default')
    inputDescription.id = 'description'
    inputDescription.setAttribute('placeholder', 'Descrição')

    let select = document.createElement('select')
    select.classList = 'select-style select-modal'
    select.id = 'company_uuid'
    select.options[select.options.length] = new Option('Selecionar empresa', 'selectAll')

    const company = await getCompanies()

    company.forEach(element => {
        select.options[select.options.length] = new Option(`${element.name}`, `${element.uuid}`)
    });


    let buttonCreate = document.createElement('button')
    buttonCreate.classList = 'button-default btn-link'
    buttonCreate.setAttribute('type', 'submit')
    buttonCreate.id = 'btn-create-department'
    buttonCreate.innerText = 'Criar o departamento'

    form.append(inputName, inputDescription, select, buttonCreate)
    container.append(title, form)

    openModal(container)
}

function openModalCreateDepartment() {
    const buttonCreate = document.querySelector('.btn-create-department')
    buttonCreate.addEventListener('click', async () => {
        await modalCreateDepartment()
        eventCreateDepartment()
    })
}

const eventCreateDepartment = () => {

    const form = document.querySelector('#form-create-department')
    const ul = document.querySelector('#list-sector')
    const modal = document.querySelector('.modal-wrapper')

    const elements = [...form.elements]

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        let body = {}

        elements.forEach((elem) => {
            if (elem.tagName == 'INPUT' || elem.tagName == 'SELECT' && elem.value !== '') {

                body[elem.id] = elem.value

            }
        })
        await createDepartment(body)
        modal.remove()
        await departmentsList(ul)
    })
}

const modalEditDepartment = (description, id) => {
    let container = document.createElement('div')
    container.classList.add('container-modal')

    let title = document.createElement('h2')
    title.innerText = 'Criar Departamento'

    let form = document.createElement('form')
    form.classList.add('form-modal')
    form.id = 'form-create-department'

    let inputDescription = document.createElement('textarea')
    inputDescription.classList = 'input-default input-edit-desc'
    inputDescription.id = 'description'
    inputDescription.value = description

    let buttonEdit = document.createElement('button')
    buttonEdit.classList = 'button-default btn-link'
    buttonEdit.setAttribute('type', 'submit')
    buttonEdit.id = 'btn-edit-department'
    buttonEdit.innerText = 'Editar o departamento'

    form.append(inputDescription, buttonEdit)
    container.append(title, form)
    eventModalEdit(form, id)
    openModal(container)
}

const eventModalEdit = async (form, id) => {

    const ul = document.querySelector('#list-sector')
    
    
    let element = [...form.elements]

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const modal = document.querySelector('.modal-wrapper')

        let body = {}
        
        element.forEach((elem) => {
            if (elem.tagName == 'TEXTAREA' && elem.value !== '') {

                body[elem.id] = elem.value

            }
        })
        await editDepartment(body, id)
        await departmentsList(ul)
        modal.remove()
    })

}

const modalDeleteDepartment = (id, name) => {
    let container = document.createElement('div')
    container.classList = 'container-modal delete-modal'
    container.id = 'modal-delete'

    let title = document.createElement('h3')
    title.innerText = `Realmente deseja deletar o Departamento ${name} e demitir seus funcionários?`

    let buttonConfirm = document.createElement('button')
    buttonConfirm.classList = 'button-default btn-link btn-confirm'
    buttonConfirm.innerText = 'Confirmar'
    buttonConfirm.setAttribute('type', 'submit')

    buttonConfirm.addEventListener('click', async () => {
        await eventDeleteDepartment(id)
    })

    container.append(title, buttonConfirm)
    openDeleteModal(container)
}

const eventDeleteDepartment = async (id) => {
    const ul = document.querySelector('#list-sector')
    const modal = document.querySelector('.modal-wrapper')

    await deleteDepartment(id)
    modal.remove()
    await departmentsList(ul)

}

const modalViewerAdm = async ({ name, description, companies, uuid }) => {

    let container = document.createElement('div')
    container.classList = 'container-modal'

    let nameDepartment = document.createElement('h2')
    nameDepartment.innerText = name

    let infDepartment = document.createElement('div')
    infDepartment.classList = 'infDepartment'

    let boxInfLeft = document.createElement('div')
    boxInfLeft.classList.add('box-inf-left')

    let descDepartment = document.createElement('p')
    descDepartment.innerText = description

    let nameCompany = document.createElement('p')
    nameCompany.innerText = companies.name

    let boxInfRight = document.createElement('form')
    boxInfRight.classList = 'box-inf-right'

    let select = document.createElement('select')
    select.classList = 'select-style select-modal'
    select.id = 'user_uuid'
    select.options[select.options.length] = new Option('Selecionar usuário', 'selectAll')


    let ulUsers = document.createElement('ul')
    ulUsers.classList = 'list-users'

    await getUserDepartment(uuid, ulUsers)
    renderSelectUsers()

    let buttonContract = document.createElement('button')
    buttonContract.classList = 'button-default btn-link btn-confirm'
    buttonContract.innerText = 'Contratar'
    buttonContract.setAttribute('type', 'submit')


    buttonContract.addEventListener('click', async (e) => {
        e.preventDefault()
        ulUsers.innerHTML = ''
        await contractUser(select.value, uuid)
        await getUserDepartment(uuid, ulUsers)
        renderSelectUsers()
    })


    boxInfLeft.append(descDepartment, nameCompany)
    boxInfRight.append(select, buttonContract)
    infDepartment.append(boxInfLeft, boxInfRight)
    container.append(nameDepartment, infDepartment, ulUsers)
    openViewerAdmModal(container)

}

const renderSelectUsers = async () => {
    const users = await listAllUsersNoWorkDepartment()

    let select = document.querySelector('#user_uuid')

    select.innerHTML = ''
    select.options[select.options.length] = new Option('Selecionar usuário', 'selectAll')
    
    users.forEach(element => {
        select.options[select.options.length] = new Option(`${element.username}`, `${element.uuid}`)
    });
}

const getUserDepartment = async (uuid, ul) => {

    let allUsers = await listAllUsers()

    allUsers.forEach(async (elem) => {
        if (elem.department_uuid == uuid) {
            ul.appendChild(await createModalUserViewer(elem, uuid))
        }
    })

}

const createModalUserViewer = async ({ username, professional_level, uuid }, id) => {
    let li = document.createElement('li')

    let infProfile = document.createElement('div')
    infProfile.classList.add('info-company')

    let nameDepartment = document.createElement('h2')
    nameDepartment.innerText = username

    let levelUser = document.createElement('p')
    levelUser.innerHTML = professional_level

    let nameCompany = document.createElement('p')
    nameCompany.innerText = await nameCompanyUser(id)

    let divContent = document.createElement('div')
    divContent.classList.add('div-buttons')

    let buttonOff = document.createElement('button')
    buttonOff.classList = 'button-default btn-link btn-off'
    buttonOff.id = 'btn-off-user'
    buttonOff.innerText = 'Desligar'
    buttonOff.setAttribute('type', 'submit')

    buttonOff.addEventListener('click', async () => {
        await offEmployee(uuid)
        li.remove()
        renderSelectUsers()
        renderUsers()
    })

    infProfile.append(nameDepartment, levelUser, nameCompany)
    divContent.appendChild(buttonOff)
    li.append(infProfile, divContent)

    return li
}

const contractUser = async (userId, id) => {
    let select = document.querySelector('#user_uuid')

    select.innerHTML = ''
    const body = {
        user_uuid: `${userId}`,
        department_uuid: `${id}`
    }

    await contractUserAdm(body)
    renderUsers()

}

const modalEditUser = (id) => {

    let container = document.createElement('div')
    container.classList.add('container-modal')

    let title = document.createElement('h2')
    title.innerText = 'Editar Usuário'

    let form = document.createElement('form')
    form.classList.add('form-modal')
    form.id = 'form-edit-user'

    let selectTypeWord = document.createElement('select')
    selectTypeWord.classList = 'select-style select-modal'
    selectTypeWord.id = 'kind_of_word'
    selectTypeWord.options[selectTypeWord.options.length] = new Option('Selecionar modalidade de trabalho', 'select')

    let selectLevel = document.createElement('select')
    selectLevel.classList = 'select-style select-modal'
    selectLevel.id = 'professional_level'
    selectLevel.options[selectLevel.options.length] = new Option('Selecionar nivel profissional', 'select')


    let levelUser = [
        {
            professional_level: 'estágio',
            name: 'Estágio'
        },
        {
            professional_level: 'júnior',
            name: 'Júnior'
        },
        {
            professional_level: 'pleno',
            name: 'Pleno'
        },
        {
            professional_level: 'sênior',
            name: 'Sênior'

        }
    ]
    let kindOfWord = [
        {
            name: 'Presencial',
            kind_of_work: 'presencial'
        },
        {
            name: 'Home office',
            kind_of_work: 'home office'
        },
        {
            name: 'Hibrido',
            kind_of_work: 'hibrido'
        }
    ]

    levelUser.forEach(element => {
        selectLevel.options[selectLevel.options.length] = new Option(`${element.name}`, `${element.professional_level}`)
    });


    kindOfWord.forEach(element => {
        selectTypeWord.options[selectTypeWord.options.length] = new Option(`${element.name}`, `${element.kind_of_work}`)
    });


    let buttonEdit = document.createElement('button')
    buttonEdit.classList = 'button-default btn-link'
    buttonEdit.setAttribute('type', 'submit')
    buttonEdit.id = 'btn-edit-user'
    buttonEdit.innerText = 'Editar usuário'

    buttonEdit.addEventListener('click', () => {
        eventUSerEdit(id, form)
    })

    form.append(selectTypeWord, selectLevel, buttonEdit)
    container.append(title, form)

    openModal(container)
}

const eventUSerEdit = async (id, form) => {
    const modal = document.querySelector('.modal-wrapper')
    let element = [...form.elements]

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        let body = {}

        element.forEach((elem) => {

            if (elem.tagName == 'SELECT' && elem.value !== '') {
                body[elem.id] = elem.value
            }
        })
        await editProfileUser(id, body)
        renderUsers()
        modal.remove()

    })

}

const modalDeleteUser = (uuid, name) => {
    let container = document.createElement('div')
    container.classList = 'container-modal delete-modal'
    container.id = 'modal-delete'

    let title = document.createElement('h3')
    title.innerText = `Realmente deseja remover o usuario ${name}?`

    let buttonConfirm = document.createElement('button')
    buttonConfirm.classList = 'button-default btn-link btn-confirm'
    buttonConfirm.innerText = 'Deletar'
    buttonConfirm.setAttribute('type', 'submit')

    buttonConfirm.addEventListener('click', async () => {
        await eventDeleteUser(uuid)
    })

    container.append(title, buttonConfirm)
    openDeleteModal(container)
}

const eventDeleteUser = async (id) => {

    const modal = document.querySelector('.modal-wrapper')

    modal.remove()
    await deleteUser(id)
    renderUsers()
}


export { openModal, eventCreateDepartment, modalCreateDepartment, openModalCreateDepartment, modalEditDepartment, modalDeleteDepartment, modalViewerAdm, modalEditUser, modalDeleteUser }
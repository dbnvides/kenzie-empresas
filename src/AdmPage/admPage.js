import { dropDown } from '../scripts/dropdown.js'
import { getCompanies, listAllDepartment, listAllUsers, listDepartment } from '../scripts/requests.js'
import { modalDeleteDepartment, modalDeleteUser, modalEditDepartment, modalEditUser, modalViewerAdm, openModalCreateDepartment } from '../scripts/modal.js'
import { logout } from '../scripts/logout.js'

export const createList = ({ name, description, companies, uuid }, element) => {

    let li = document.createElement('li')

    let infProfile = document.createElement('div')
    infProfile.classList.add('info-company')

    let nameDepartment = document.createElement('h2')
    nameDepartment.innerText = name

    let descriptionDepartment = document.createElement('p')
    descriptionDepartment.innerHTML = description

    let nameCompany = document.createElement('p')
    nameCompany.innerText = companies.name

    let divContent = document.createElement('div')
    divContent.classList.add('div-buttons')

    let buttonViewer = document.createElement('button')
    buttonViewer.classList = 'btn-open-modal modal-viewer'
    buttonViewer.id = 'btn-department-viewer'

    buttonViewer.addEventListener('click', async () => {
        await modalViewerAdm(element)
    })

    let buttonEdit = document.createElement('button')
    buttonEdit.classList = 'btn-open-modal modal-edit'
    buttonEdit.id = 'btn-department-edit'

    buttonEdit.addEventListener('click', () => {
        modalEditDepartment(description, uuid)
    })

    let buttonDelete = document.createElement('button')
    buttonDelete.classList = 'btn-open-modal modal-delete'
    buttonDelete.id = 'btn-department-delete'

    buttonDelete.addEventListener('click', () => {
        modalDeleteDepartment(uuid, name)
    })

    infProfile.append(nameDepartment, descriptionDepartment, nameCompany)
    divContent.append(buttonViewer, buttonEdit, buttonDelete)
    li.append(infProfile, divContent)

    return li
}

export const renderList = (list, section) => {
    section.innerHTML = ''

    list.forEach(element => {
        section.appendChild(createList(element, element))
    });
}

export const departmentsList = async (section, idCompany) => {
    if (idCompany == undefined) {
        renderList(await listAllDepartment(), section)
    }
    else if (idCompany !== 'selectAllCompany' && idCompany !== undefined) {
        renderList(await listDepartment(idCompany), section)

    }
    else {
        renderList(await listAllDepartment(), section)

    }

}

const renderSelectCompany = async () => {
    const company = await getCompanies()

    let select = document.querySelector('#select-company')
    select.options[select.options.length] = new Option('Selecionar Empresa', 'selectAllCompany')

    company.forEach(element => {
        select.options[select.options.length] = new Option(`${element.name}`, `${element.uuid}`)
    });

    filterCompany(select)
}

async function filterCompany(company) {
    let ul = document.querySelector('#list-sector')

    if (company.value == 'selectAllCompany') {
        await departmentsList(ul, company.value)
    }

    company.addEventListener('change', async () => {
        if (company.value == 'selectAllCompany') {
            await departmentsList(ul, company.value)
        } else {
            await departmentsList(ul, company.value)
        }
    })
}

const createListUser = async ({ username, professional_level, department_uuid, uuid }) => {
    
    let li = document.createElement('li')

    let infProfile = document.createElement('div')
    infProfile.classList.add('info-company')

    let nameDepartment = document.createElement('h2')
    nameDepartment.innerText = username

    let descriptionDepartment = document.createElement('p')
    if(professional_level !== null){
        let levelName = professional_level[0].toUpperCase() + professional_level.substring(1)
        descriptionDepartment.innerHTML = levelName
    }

    let nameCompany = document.createElement('p')

    if(department_uuid !== undefined && department_uuid !== null){
        nameCompany.innerText = await nameCompanyUser(department_uuid)
    }

    let divContent = document.createElement('div')
    divContent.classList.add('div-buttons')

    let buttonEdit = document.createElement('button')
    buttonEdit.classList = 'btn-open-modal modal-edit'
    buttonEdit.id = 'btn-user-edit'

    buttonEdit.addEventListener('click', () => {
        modalEditUser(uuid)
    })

    let buttonDelete = document.createElement('button')
    buttonDelete.classList = 'btn-open-modal modal-delete'
    buttonDelete.id = 'btn-user-delete'

    buttonDelete.addEventListener('click', () => {
        modalDeleteUser(uuid, username)
    })

    infProfile.append(nameDepartment, descriptionDepartment, nameCompany)
    divContent.append(buttonEdit, buttonDelete)
    li.append(infProfile, divContent)

    return li
}

export async function nameCompanyUser(idDepartment) {

    let departments = await listAllDepartment()
    let response

    departments.forEach(element => {
        if(idDepartment !== null){
            if (element.uuid == idDepartment) {
                 response = element.companies.name
            }
        }
    })

    return response

}

export async function renderUsers() {
    const ul = document.querySelector('#list-users')
    ul.innerHTML = ''
    let allUsers = await listAllUsers()
   
    allUsers.forEach(async (el) => {
        if(el.username !== 'ADMIN'){
            ul.append(await createListUser(el))
        }
    })
}

logout()
openModalCreateDepartment()
await renderUsers()
await renderSelectCompany()
dropDown()

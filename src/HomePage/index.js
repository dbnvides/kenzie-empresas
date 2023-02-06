import { getAllSectors, getCompanies, getSectors, listAllDepartment } from "../scripts/requests.js"
import { dropDown } from '../scripts/dropdown.js'

dropDown()

const createList = ({ name, opening_hours, sectors }) => {

    let li = document.createElement('li')
    li.classList.add('list-show-companies')

    let divTitle = document.createElement('div')

    let nameCompany = document.createElement('h2')
    nameCompany.innerText = name

    let divContent = document.createElement('div')

    let opnHours = document.createElement('span')
    opnHours.innerHTML = `${(opening_hours)} horas `

    let tagSector = document.createElement('span')
    tagSector.innerText = sectors.description
    tagSector.classList.add('sector-name')

    divContent.append(opnHours, tagSector)
    divTitle.appendChild(nameCompany)
    li.append(divTitle, divContent)

    return li
}

const renderCompany = async () => {
    const company = await getCompanies()
    const divSector = document.querySelector('.div-sectors')
    let newSec = []
    let sectorStorage = []

    let ul = document.querySelector('.list-companies')

    let select = document.createElement('select')
    select.classList.add('select-style')
    select.options[select.options.length] = new Option('Selecionar setor', 'selectAll')

    company.forEach(element => {

        sectorStorage = [...sectorStorage, element]

        if (!newSec.includes(element.sectors.description)) {
            select.options[select.options.length] = new Option(`${element.sectors.description}`, `${element.sectors.description}`)
            ul.append(createList(element))
            newSec = [...newSec, element.sectors.description]
        }

    });

    divSector.append(select)
    await filterSector(select, sectorStorage)
}

async function filterSector(sector, storageCompany) {
    const ul = document.querySelector('.list-companies')


    sector.addEventListener('change', async () => {
        
        if (sector.value !== 'selectAll') {
            let response = await getSectors(sector.value)
            ul.innerHTML = ''
            response.forEach(element => {
                ul.append(createList(element))
            })
        } else {
            ul.innerHTML = ''
            storageCompany.forEach(el => {
                ul.append(createList(el))
            })
        }

    })

    
}



renderCompany()
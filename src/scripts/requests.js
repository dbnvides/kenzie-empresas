import { getLocalStorage } from "./localstorage.js"
import { toast, toastRegister } from "./toast.js"

const baseURL = 'http://localhost:6278/'

const getCompanies = async () => {
    try {
        const request = await fetch(`${baseURL}companies`, {
            method: 'GET',
            headers: {
                'Content': 'application/json'
            },
        })
        const response = await request.json()
        return response
    } catch (err) {
        console.log(err)
    }

}

const getSectors = async (sector) => {
    try {
        const request = await fetch(`${baseURL}companies/${sector}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await request.json()
        return response
    } catch (err) {
        console.log(err)
    }
}

const getAllSectors = async () => {
    try {
        const request = await fetch(`${baseURL}sectors`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await request.json()
        return response
    } catch (err) {
        console.log(err)
    }
}


const setlogin = async (body) => {

    try {
        const request = await fetch(`${baseURL}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if (request.ok) {

            const response = await request.json()
           
            localStorage.setItem('userToken', JSON.stringify(response))
          
            let validateUser = await getValidationUser()
            if(validateUser.is_admin == true){

                toast('Login efetuado com sucesso!', 'Bem vindo ADMIN! Você será redirecionado para a DashBoard...')

                setTimeout(() => {

                    window.location.replace('../AdmPage/admPage.html')
                    
                }, 5000)
               
            }else{   
                toast('Login efetuado com sucesso!', 'Bem vindo! Você será redirecionado para a DashBoard')

                setTimeout(() => {

                    window.location.replace('../UserPage/userPage.html')
                    
                }, 5000)
               
            }
        }else{
            toast('Erro', 'Login não efetuado')
        }
    } catch (e) {
       toast('Erro', console.error(e))
    }
}

const setRegister = async (body) => {
    
    try {
        const request = await fetch(`${baseURL}auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (request.ok) {

            const response = await request.json()

            toastRegister('Sua conta foi criada com sucesso!', 'Em instantes você será redirecionado para a pagina de login aguarde...')


            setTimeout(() => {

                window.location.replace('../Login/login.html')

            }, 5000)
        }else{
            throw request
        }
    } catch (error) {
        let err = await error.json()
        let test = err.error
        toastRegister('Erro!', `${test}`)
    }
}

const listAllDepartment = async () => {

    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}departments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
        });

        const response = await request.json();
        return response
    } catch (err) {
        console.log(err)
    }
}

const listDepartment = async (idCompany) => {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}departments/${idCompany}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
        });

        const response = await request.json();
        return response
    } catch (err) {
        console.log(err)
    }

}

const listAllUsers = async () => {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
        });
        const response = await request.json();
        return response
    } catch (err) {
        console.log(err)
    }

}

const createDepartment = async (body) => {

    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}departments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
        })
        if (request.ok) {

            const response = await request.json();
            return response
        }
    } catch (err) {
        console.log(err)
    }
}

const editDepartment = async (body, id) => {

    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}departments/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
        })
        if (request.ok) {

            const response = await request.json();
            return response
        }
    } catch (err) {
        console.log(err)
    }
}

const deleteDepartment = async (id) => {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}departments/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            }
        })

    } catch (err) {
        console.log(err)
    }
}

const listAllUsersDepartment = async () => {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}users/departments/coworkers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
        });
        const response = await request.json();
        return response
    } catch (err) {
        console.log(err)
    }
}

const listAllUsersNoWorkDepartment = async () => {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}admin/out_of_work`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
        });
        const response = await request.json();
        return response
    } catch (err) {
        console.log(err)
    }
}

const contractUserAdm = async (body) => {
    const localStorage = getLocalStorage()
    try {
        const request = await fetch(`${baseURL}departments/hire`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
        })
        if (request.ok) {
            const response = await request.json();
            return response
        }
    } catch (err) {
        console.log(err)
    }
}

const offEmployee = async (id) => {
    const localStorage = getLocalStorage()
    try {
        const request = await fetch(`${baseURL}departments/dismiss/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
        })
        if (request.ok) {
            const response = await request.json();
            return response
        }
    } catch (err) {
        console.log(err)
    }
}

const editProfileUser = async (id, body) => {

    const localStorage = getLocalStorage()
    try {
        const request = await fetch(`${baseURL}admin/update_user/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`,
            },
            body: JSON.stringify(body)
        })
        if (request.ok) {
            const response = await request.json();
            return response
        }
    } catch (err) {
        console.log(err)
    }
}

const deleteUser = async (id) => {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}admin/delete_user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            }
        })

    } catch (err) {
        console.log(err)
    }
}

const getInfUser = async () => {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}users/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
        });
        const response = await request.json();
        return response
    } catch (err) {
        console.log(err)
    }
}

const getInfUSerCompany = async () => {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}users/departments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
        });
        const response = await request.json();
        return response
    } catch (err) {
        console.log(err)
    }
}

const getCoWorks = async () => {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}users/departments/coworkers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
        });
        const response = await request.json();
        return response
    } catch (err) {
        console.log(err)
    }
}

const editProfileUserPerfil = async (body) => {
    const localStorage = getLocalStorage()
    try {
        const request = await fetch(`${baseURL}users`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
        })
        if (request.ok) {
            const response = await request.json();
            return response
        }
    } catch (err) {
        console.log(err)
    }
}

const getValidationUser = async () => {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}auth/validate_user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
        });
        const response = await request.json();
       
        return response
    } catch (err) {
        console.log(err)
    }
}



export {
    getCompanies, getSectors, setlogin, setRegister, listAllDepartment, listDepartment,
    listAllUsers, createDepartment, editDepartment, deleteDepartment, listAllUsersDepartment, listAllUsersNoWorkDepartment, contractUserAdm, offEmployee, editProfileUser, deleteUser, getInfUser, getInfUSerCompany, getCoWorks, editProfileUserPerfil, getValidationUser, getAllSectors
}
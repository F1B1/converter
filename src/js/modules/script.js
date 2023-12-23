import variables from "./variables.js";
import state from "./state.js";


import { handleChange } from "./convert.js";
import { fetchLatest } from "./single.js";

const {selects, success, tabs, formSelect} = variables



const renderCodeList = ()=>{
    selects.forEach(select =>{
        state.codes.forEach(([code])=>{
            const elements = document.createElement('option')
            elements.value = code
            elements.innerText = code
            select.insertAdjacentElement('beforeend', elements)
        })

        const name = select.getAttribute('name')
        name && select.addEventListener('change', handleChange)
    })
}

export const fetchCodes = async ()=>{
    try{
        const response = await fetch(`${state.url}/codes`)

        const data = await response.json()

        if(data.result === success){
            state.codes = data.supported_codes
            renderCodeList()
            fetchLatest()
        }else{
            let err = document.createElement('div')
            err.innerText = `
                Error: ${response.status} (Too many Requests)
                your request limit - 1500
            `
            document.querySelector('.form').appendChild(err)
            
        }
    }catch(err){
        console.log(err);
    }
}

export const handleTabClick = ({currentTarget: target}) =>{
    const {tab} = target.dataset
    const children = document.querySelectorAll('.content')
    
    tabs.forEach(item=>{
        item.classList.remove('active')
    })
    target.classList.add('active')

    for (const child of children) {
        if(child.dataset.child === tab) child.classList.add('show')
        else child.classList.remove('show')
    }

    state.currentTab = tab
}
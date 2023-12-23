import { renderResult } from "./markups.js";
import state from "./state.js";
import { convertTime, formatToCurrency, getFullTitle } from "./utils.js";
import variables from "./variables.js";

const {success, rateConvertion, resultFrom, resultTo, ratelast, toSelect, fromSelect} = variables

export const handleChange = ({target: {value, name}})=>{
    state.pair ={
        ...state.pair,
        [name]: value,
    }
}

export const handleInput = ({target: {value, name}}) =>{
    state[name] = Number(value)
}

const insertResults = ({
    base_code: baseCode, target_code: targetCode, conversion_rate: rate, conversion_result: result, time_last_update_utc: time 
})=>{
    const from = {
        code: baseCode, 
        amount: state.amount, 
        full: getFullTitle(state.codes, baseCode)
    }

    const to = {
        code: targetCode, 
        amount: result, 
        full: getFullTitle(state.codes, targetCode)
    }

    
    resultFrom.innerHTML = renderResult(from)
    resultTo.innerHTML = renderResult(to)
   
    const baseValue = formatToCurrency(baseCode, 1)
    const targeteValue = formatToCurrency(targetCode, rate)

    rateConvertion.innerText = `${baseValue} = ${targeteValue}`

    ratelast.innerText = `Last updated ${convertTime(time)}`


    document.querySelector('.form-results').classList.add('show')
}
export const handleSubmit = async (e) =>{
    e?.preventDefault()
    
    const {url, amount, pair: { from, to}} = state
  
    state.loading = true

    try{
        const response = await fetch(`${url}/pair/${from}/${to}/${amount}`);
        const data = await response.json();
        
        if(data.result === success) insertResults(data)

        state.loading = false
    }catch(err){
        console.log(err);
    }
}

export const switchCurrencies =()=>{
    const {pair: {to, from}} = state

    state.pair ={
        to: from,
        from: to
    }

    toSelect.value = from
    fromSelect.value = to
}
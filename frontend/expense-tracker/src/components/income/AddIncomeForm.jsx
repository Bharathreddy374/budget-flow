import React, { useState } from 'react'
import Input from '../../components/inputs/Input'
import EmojiPickerPopup from '../../components/EmojiPickerPopup'
const AddIncomeForm = ({onAddIncome}) => {
    const [income,setIncome]=useState({
        source:"",
        amount:"",
        date:"",
        icon:"",
    });
    const handleChange =(key,value)=> setIncome({
        ...income,[key]:value
    });
  return (
<div className="">
    <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}/>


<Input 
    value={income.source}
    onChange={({target})=>handleChange("source",target.value)}
    label="Income Source"
    placeholder="Freelance,Salary,Etc"
    type="text"
    />

<Input
    value={income.amount}
    onChange={({target})=>handleChange("amount",target.value)}
    label="Income Amount"
    placeholder="1000"
    type="number"
    />
<Input
    value={income.date}
    onChange={({target})=>handleChange("date",target.value)}
    label="Income Date"
    placeholder="2023-10-10"
    type="date"/>

    <div className="">
        <button type='button' className='add-btn add-btn-fill'
        onClick={()=>onAddIncome(income)}
        >Add Income</button>
    </div>

</div>  )
}

export default AddIncomeForm
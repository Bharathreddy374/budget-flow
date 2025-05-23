import React, { useState } from 'react'
import Input from '../../components/inputs/Input'
import EmojiPickerPopup from '../../components/EmojiPickerPopup'
const AddExpense = ({onAddExpense}) => {
    const [expense,setExpense]=useState({
        category:"",
        amount:"",
        date:"",
        icon:"",
    });
    const handleChange =(key,value)=> setExpense({
        ...expense,[key]:value
    });
  return (
<div className="">
    <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}/>


<Input 
    value={expense.category}
    onChange={({target})=>handleChange("category",target.value)}
    label="Expense Category"
    placeholder="Food,Funds,Etc"
    type="text"
    />

<Input
    value={expense.amount}
    onChange={({target})=>handleChange("amount",target.value)}
    label="Expense Amount"
    placeholder="1000"
    type="number"
    />
<Input
    value={expense.date}
    onChange={({target})=>handleChange("date",target.value)}
    label="Expense Date"
    placeholder="2023-10-10"
    type="date"/>

    <div className="">
        <button type='button' className='add-btn add-btn-fill'
        onClick={()=>onAddExpense(expense)}
        >Add Expense</button>
    </div>

</div>  )
}

export default AddExpense
export const validateEmail =(email)=>{
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name)=>{
    if(!name) return "";
    const words =name.split(" ");
    let initials="";
    for(let i=0;i<Math.min(words.length,2);i++){
        initials += words[i][0];

    }
    initials = initials.replace(/;/g, "");
    return initials.toUpperCase();
}
export const addThousandsSeparator = (num) => {
  if (typeof num !== "number" && typeof num !== "string") return num;

  const number = Number(num);
  if (isNaN(number)) return num;

  return number.toLocaleString("en-IN");
};

export const prepareExpenseBarChartData =(data=[])=>{
    const chartData = data.map((item)=>({
        category:item?.category,
        amount:item?.amount,
    }));
    return chartData;
};
import moment from "moment";
export const prepareIncomeBarChartData =(data=[])=>{
    const sortedData=[...data].sort((a,b)=> new Date(a.date)-new Date(b.date) )

    const charData = sortedData.map((item)=>({
        month:moment(item?.date).format('Do MMM'),
        amount:item?.amount,
        source:item?.source,
    }));
    return charData;
};

export const prepareExpenseLineChartData =(data=[])=>{
    const sortedData=[...data].sort((a,b)=> new Date(a.date)-new Date(b.date) )

    const charData = sortedData.map((item)=>({
        month:moment(item?.date).format('Do MMM'),
        amount:item?.amount,
        category:item?.category,
    }));
    return charData;
}

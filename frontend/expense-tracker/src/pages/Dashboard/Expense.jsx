import React, { useState,useEffect} from 'react'
import axiosInstance from "../../utils/axiosInstance"
import Modal from '../../components/Modal';
import DeleteAlert from '../../components/DeleteAlert';
import ExpenseList from '../../components/expense/ExpenseList';
import { toast } from 'react-hot-toast';
import { API_PATHS } from '../../utils/apiPath';
import AddExpense from '../../components/expense/AddExpense';
import DashboardLayout from '../../components/layouts/DashboardLayout'
import ExpenseOverview from '../../components/expense/ExpenseOverview';
import { UseUserAuth } from '../../hooks/useUserAuth';
const Expense = () => {
  UseUserAuth();
   const [expenseData,setExpenseData]=useState([]);
  const[loading,setLoading]=useState(false);
  const[openDeleteAlert,setOpenDeleteAlert]=useState({
    show:false,
    data:null,
  });
  const [openAddExpenseModal,setOpenAddExpenseModal]=useState(false);

  const fetchExpenseDetails = async()=>{
    if (loading) return;
    setLoading(true);
    try{
      const response=await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if(response.data){
        setExpenseData(response.data);
      }

    }catch(error){
      console.log("somthing went Wrong.Please try agian",error);
    }finally{
      setLoading(false);
    }
  };

  const handleExpense= async(expense)=>{
    const {category,amount,date,icon}=expense;
    if(!category.trim()){
      toast.error("Please enter expense category");
      return;
    }
    if(!amount || isNaN(amount)|| Number(amount)<=0){
      toast.error("Please enter valid expense amount");
      return;
    }
    if(!date){
      toast.error("Please enter expense date");
      return;
    }
    try{
      await axiosInstance.post(
        `${API_PATHS.EXPENSE.ADD_EXPENSE}`,
        {
          category,
          amount,
          date,
          icon,
        }
      );
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    }
    catch(error){
      "Error while adding expense",
      error.response?.data?.message || error.message
    }
      
  };

  const deleteExpense = async(id)=>{
    try{
      await axiosInstance.delete(
        API_PATHS.EXPENSE.DELETE_EXPENSE(id)
      );
      setOpenDeleteAlert({show:false,data:null});
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    }catch(error){
      toast.error("Error while deleting expense");
    }
  };

  const downloadExpense =async()=>{
    try{
    const response=await axiosInstance.get(
      API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
      {
        responseType:"blob",
      }
    );
    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Expense downloaded successfully");
    } else {
      throw new Error("Download failed with status " + response.status);
    }
  } catch (error) {
    console.error("Error while downloading expense", error);
    toast.error("Error while downloading expense");
  }
};
   

  useEffect(() => {
    fetchExpenseDetails();
  
    return () => {
      
    }
  }, [])
  

  return (
 <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
            transactions={expenseData}
            onAddExpense={()=>setOpenAddExpenseModal(true)}/>
          </div>
        </div>
        <ExpenseList
        transactions={expenseData}
        onDelete={(id)=>{
          setOpenDeleteAlert({
            show:true,
            data:id,
          });
          }}
          onDownload={downloadExpense}
        />
      <Modal
      isOpen={openAddExpenseModal}
      onClose={()=>setOpenAddExpenseModal(false)}
      title="Add Expense"
      >
        <AddExpense onAddExpense={handleExpense}/>

      </Modal>
      <Modal
      isOpen={openDeleteAlert.show}
      onClose={()=>setOpenDeleteAlert({show:false,data:null})}
      title="Delete Expense" 
      >
        <DeleteAlert
        content="Are you sure you want to delete this expense?"
        onDelete={()=>
           deleteExpense(openDeleteAlert.data)
        }/>
      </Modal>

        </div>  
        </DashboardLayout>
        )
}

export default Expense;
import React, { useState,useEffect } from 'react'
import axiosInstance from "../../utils/axiosInstance"
import Modal from '../../components/Modal';
import DeleteAlert from '../../components/DeleteAlert';
import IncomeList from '../../components/income/IncomeList';
import { toast } from 'react-hot-toast';
import { API_PATHS } from '../../utils/apiPath';
import AddIncomeForm from '../../components/income/AddIncomeForm';
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/income/IncomeOverview';
import { UseUserAuth } from '../../hooks/useUserAuth';
const Income = () => {
  UseUserAuth();
   const [incomeData,setIncomeData]=useState([]);
  const[loading,setLoading]=useState(false);
  const[openDeleteAlert,setOpenDeleteAlert]=useState({
    show:false,
    data:null,
  });
  const [openAddIncomeModal,setOpenAddIncomeModal]=useState(false);

  const fetchIncomeDetails = async()=>{
    if (loading) return;
    setLoading(true);
    try{
      const response=await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if(response.data){
        setIncomeData(response.data);
      }

    }catch(error){
      console.log("somthing went Wrong.Please try agian",error);
    }finally{
      setLoading(false);
    }
  };

  const handleAddIncome= async(income)=>{
    const {source,amount,date,icon}=income;
    if(!source.trim()){
      toast.error("Please enter income source");
      return;
    }
    if(!amount || isNaN(amount)|| Number(amount)<=0){
      toast.error("Please enter valid income amount");
      return;
    }
    if(!date){
      toast.error("Please enter income date");
      return;
    }
    try{
      await axiosInstance.post(
        `${API_PATHS.INCOME.ADD_INCOME}`,
        {
          source,
          amount,
          date,
          icon,
        }
      );
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    }
    catch(error){
      "Error while adding income",
      error.response?.data?.message || error.message
    }
      
  };

  const deleteIncome = async(id)=>{
    try{
      await axiosInstance.delete(
        API_PATHS.INCOME.DELETE_INCOME(id)
      );
      setOpenDeleteAlert({show:false,data:null});
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    }catch(error){
      toast.error("Error while deleting income");
    }

  };

  const downloadIncome =async()=>{

     try{
    const response=await axiosInstance.get(
      API_PATHS.INCOME.DOWNLOAD_INCOME,
      {
        responseType:"blob",
      }
    );
    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Income downloaded successfully");
    } else {
      throw new Error("Download failed with status " + response.status);
    }
  } catch (error) {
    console.error("Error while downloading income", error);
    toast.error("Error while downloading income");
  }
  };

  useEffect(() => {
    fetchIncomeDetails();
  
    return () => {
      
    }
  }, [])
  

  return (
 <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
            transactions={incomeData}
            onAddIncome={()=>setOpenAddIncomeModal(true)}/>
          </div>
        </div>
        <IncomeList
        transactions={incomeData}
        onDelete={(id)=>{
          setOpenDeleteAlert({
            show:true,
            data:id,
          });
          }}
          onDownload={downloadIncome}
        />
      <Modal
      isOpen={openAddIncomeModal}
      onClose={()=>setOpenAddIncomeModal(false)}
      title="Add Income"
      >
        <AddIncomeForm onAddIncome={handleAddIncome}/>

      </Modal>
      <Modal
      isOpen={openDeleteAlert.show}
      onClose={()=>setOpenDeleteAlert({show:false,data:null})}
      title="Delete Income" 
      >
        <DeleteAlert
        content="Are you sure you want to delete this income?"
        onDelete={()=>
           deleteIncome(openDeleteAlert.data)
        }/>
      </Modal>

        </div>  
        </DashboardLayout>
        )
}

export default Income;
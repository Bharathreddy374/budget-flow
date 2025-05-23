import React, { useState,useEffect } from 'react'
import {UseUserAuth} from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import HistoryList from '../../components/history/HistoryList';

const History = () => {
  UseUserAuth();
  const [dashboardData,setDashboardData]=useState(null);
  const [loading,setLoading]=useState(false);

  const fetchdashboardData = async()=>{
    if(loading) return;
    setLoading(true);
    try{
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if(response.data){
        setDashboardData(response.data);
      }
    }catch(error){
      console.log("Somthing went wrong.Please try again.",error);
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchdashboardData();
    return () => {
    }
  }, []);
  

  return (
    <DashboardLayout activeMenu="History">
      <div className="my-5 mx-auto">
       
          <HistoryList
          transactions={dashboardData?.recentTransactions || []}
          />
        
        </div>
     
    </DashboardLayout>
  );
}

export default History;
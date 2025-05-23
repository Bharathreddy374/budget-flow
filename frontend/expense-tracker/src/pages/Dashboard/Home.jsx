import React, { useState,useEffect } from 'react'
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import ExpenseOverview from '../../components/Dashboard/ExpenseOverview';
import { useNavigate } from 'react-router-dom';
import {UseUserAuth} from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import InfoCard from '../../components/Cards/InfoCard';
import { LuHandCoins,LuWalletMinimal } from 'react-icons/lu';
import {IoMdCard} from "react-icons/io";
import RecentIncome from '../../components/Dashboard/RecentIncome';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import { addThousandsSeparator } from '../../utils/helper';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
const Home = () => {
  UseUserAuth();
  const navigate = useNavigate();
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
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <InfoCard
          icon={<IoMdCard/>}
          label="Total Balance"
          value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
          color="bg-primary"
          />
          <InfoCard
          icon={<LuWalletMinimal/>}
          label="Total Income"
          value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
          color="bg-green-500"
          />
          <InfoCard
          icon={<LuHandCoins/>}
          label="Total Expense"
          value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
          color="bg-red-500"
          />

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={()=>navigate("/history")}/>

          <FinanceOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome ={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpense || 0}
          />
          <ExpenseTransactions
          transactions={dashboardData?.last30Daysexpenses?.transactions || []}
          onSeeMore={()=>navigate("/expense")}
          />
          <ExpenseOverview
          data={dashboardData?.last30Daysexpenses?.transactions || []}
          />
        <RecentIncomeWithChart
        data={dashboardData?.last60DaysIncomes?.transactions?.slice(0,4)||[]}
        totalIncome={dashboardData?.totalIncome || 0}
        />
        <RecentIncome
        transactions={dashboardData?.last60DaysIncomes?.transactions || []}
          onSeeMore={()=>navigate("/income")}
        />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;
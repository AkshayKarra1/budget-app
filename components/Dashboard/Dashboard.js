import Navbar from "../Navbar/Navbar";
import { Chart } from "react-google-charts";
import { useState, useEffect } from "react";
import Services from "../../util/Services";

const Dashboard = () => {
  const [chartData, setChartData] = useState(["Category", "Amount"]);

  const pieChartOptions = {
    title: "Monthly Expenses",
  };

  const barGraphOptions = {
    title: "Mothly Expenses",
  };

  async function fetchExpenses() {
    let resp = await Services.getExpenses();
    console.log(resp);

    if (resp && resp.success && resp.data) {
      setChartData(resp.data.chartData);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchExpenses();
    })();
  }, []);

  return (
    <>
      <Navbar activeTab="dashboard"></Navbar>
      <h4>Budget Reports</h4>

      <div style={{ display: "flex" }}>
        <div>
          <Chart
            chartType="PieChart"
            data={chartData}
            options={pieChartOptions}
            width={"100%"}
            height={"400px"}
          />
        </div>
        <div>
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={chartData}
            options={barGraphOptions}
          />
        </div>
        <div>
          <Chart
            chartType="AreaChart"
            width="100%"
            height="400px"
            data={chartData}
            options={pieChartOptions}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

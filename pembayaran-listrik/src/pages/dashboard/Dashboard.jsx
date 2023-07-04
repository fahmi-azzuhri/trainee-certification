import React, { useState } from "react";
import DataUser from "../kelola/DataUser";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dataUser"); // Set activePage to "dataUser"

  const handleSetActivePage = (page) => {
    setActivePage(page);
  };

  return <>{activePage === "dataUser" && <DataUser />}</>;
};

export default Dashboard;

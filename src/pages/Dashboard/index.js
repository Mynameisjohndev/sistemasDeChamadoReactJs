import { useState, useContext } from 'react';

import { UserContext } from '../../context/user'

const Dashboard = () => {
  const { signout } = useContext(UserContext)
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() =>signout()}>Sair</button>
    </div>
  );
}

export default Dashboard;
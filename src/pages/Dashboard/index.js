import { useState, useContext } from 'react';

import { UserContext } from '../../context/user'
import Header from '../../components/Header'

const Dashboard = () => {
  const { signout } = useContext(UserContext)
  return (
    <div>
      <Header />
      <h1>Dashboard</h1>
      <button onClick={() => signout()}>Sair</button>
    </div>
  );
}

export default Dashboard;
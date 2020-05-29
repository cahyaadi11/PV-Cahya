import React from 'react';
import logo from './logo.svg';
import './App.css';
import SideBar from './components/Sidebar';
import CreateAppointment from './components/appointment/Create';
import AppointmentList from './components/appointment/List';
import TodayAppointments from './components/appointment/Today';

function App() {
  return (
    <div> 
      <SideBar />
      <CreateAppointment />
      <AppointmentList />
      <TodayAppointments />
    </div>
  );
}

export default App;

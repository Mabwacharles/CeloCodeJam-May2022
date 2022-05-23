import React, { lazy, useState } from "react";
import Home from './pages/Home'
import './index.css'
import { Alert } from './components/alert'
import { notificationStore } from './store'

function App() {
  const notification = notificationStore(state => state.notification)
  const showNotification = notificationStore(state => state.showNotification)

  return (
    <div className="">
      <div className="relative w-full flex justify-center">
        {
          showNotification &&
          <Alert type={notification[0]} message={notification[1]} />
        }
      </div>
      <Home />
    </div>
  );
}
export default App;

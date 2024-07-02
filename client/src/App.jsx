import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserForm from './components/UserForm';
import './App.css';
import UserDisplay from './components/UserDisplay';
import Header from './components/Header';
import SingleUserDisplay from './components/SingleUserDisplay';
import MapDisplay from './components/MapDisplay';
import { createUser, updateUserById } from './services/userService';

function App() {
  const [title, setTitle] = useState('');

  return (
    <>
      <Header title={title} />
      <Routes>
        <Route path="/reports" element={<UserDisplay setTitle={setTitle} />} />
        <Route path="/map/:id" element={<MapDisplay />} /> 
        <Route path="/:id/details" element={<SingleUserDisplay setTitle={setTitle} />} />
        <Route path="/" element={<UserForm submitFunction={createUser} setTitle={setTitle} />} />
        <Route path="/:id/edit" element={<UserForm submitFunction={updateUserById} setTitle={setTitle} />} />
      </Routes>
    </>
  );
}

export default App;


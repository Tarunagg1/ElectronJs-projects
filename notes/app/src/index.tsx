import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layoout } from './components/Layoout';
import { Work } from './pages/Work';
import { TodoForm } from './pages/TodoForm';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layoout />}>
          <Route path="/work" element={<Work />}></Route>
          <Route path="/form" element={<TodoForm />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    {/* <App /> */}
    {/* <h1>pokpoopko</h1> */}
    {/* <TodoForm /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

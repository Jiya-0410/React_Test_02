// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// const root = ReactDOM.createRoot(document.getElementById("root")!);
// root.render(<App />);
// // createRoot(document.getElementById('root')!).render(
// //   <StrictMode>
// //     <App />
// //   </StrictMode>,
// // )

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // important

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

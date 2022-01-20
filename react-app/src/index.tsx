import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StatsPage from "./pages/StatsPage";
import RegisterPage from "./pages/RegisterPage";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.render(
  // <QueryClientProvider client={queryClient}>
  //   <BrowserRouter>
  //     <React.StrictMode>
  //       <Routes>
  //         <Route path="/login" element={<LoginPage />} />
  //         <Route path="/" element={<NavBar />}>
  //           <Route index element={<HomePage />} />
  //           <Route path="/stats" element={<StatsPage />} />
  //           <Route path="/register" element={<RegisterPage />} />
  //           <Route path="*" element={<HomePage />} />
  //         </Route>
  //       </Routes>
  //     </React.StrictMode>
  //   </BrowserRouter>
  // </QueryClientProvider>,
  <App />,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

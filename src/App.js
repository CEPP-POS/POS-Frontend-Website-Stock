import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Owner/SetupShop/login";
import Home from "./Pages/Owner/SaleSummary/OverView/home";
import SaleSummaryGraph from "./Pages/Owner/SaleSummary/SaleSummaryGraph/saleSummaryGraph";
import Stock from "./Pages/Owner/SaleSummary/Stock/stock";
import AddOwnerProduct from "./Pages/Owner/SaleSummary/Stock/addOwnerProduct";
import ProductDetail from "./Pages/Owner/SaleSummary/Stock/productDetail";
import CancelOrderSummary from "./Pages/Owner/SaleSummary/OrderSummary/cancelOrderSummary";
import OrderSummary from "./Pages/Owner/SaleSummary/OrderSummary/orderSummary";
import Branch from "./Pages/Owner/SetupShop/branch";
import WebSocket from "ws";
import { WebSocketProvider } from "./webSocketContext";
import EditOwnerProduct from "./Pages/Owner/SaleSummary/Stock/editOwnerProduct";

function App() {
  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <Router>
        <Routes>
          {/* Routes without Navbar : login flow */}
          <Route path="/" element={<Login />} />
          <Route path="/branch" element={<Branch />} />

          {/* Sale summary */}
          <Route path="/overview" element={<Home />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/sale-summary-graph" element={<SaleSummaryGraph />} />
          <Route path="/stock" element={<Stock />} />

          <Route path="/add-owner-product" element={<AddOwnerProduct />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route
            path="/cancel-order-summary"
            element={<CancelOrderSummary />}
          />
          <Route path="/edit-owner-product" element={<EditOwnerProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

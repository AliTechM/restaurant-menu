import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CategoriesPage from "./pages/CategoriesPage";
import ItemsPage from "./pages/ItemsPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CategoriesPage />} />
          <Route path="/category/:categoryId" element={<ItemsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

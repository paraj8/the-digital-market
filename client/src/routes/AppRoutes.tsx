import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import AdminLayout from "../components/admin/layout/AdminLayout";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import DashboardPage from "../pages/admin/DashboardPage";

import HomePage from "../pages/home/HomePage";
import ProductDetailsPage from "../pages/product/ProductDetailsPage";
import ProductListingPage from "../pages/product/ProductListingPage";

import RegisterPage from "../pages/auth/RegisterPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import LoginPage from "../pages/auth/LoginPage";

import ProfilePage from "../pages/profile/ProfilePage";
import OrdersPage from "../pages/orders/OrdersPage";
import WishlistPage from "../pages/wishlist/WishlistPage";
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";

import MessagesPage from "../pages/messages/MessagesPage";
import AiAssistantPage from "../pages/ai/AiAssistantPage";
import AddressesPage from "../pages/addresses/AddressesPage";
import SettingsPage from "../pages/settings/SettingsPage";

function AppRoutes() {
  return (
    <Routes>

      {/* ===================================== */}
      {/* ADMIN */}
      {/* ===================================== */}

      <Route
        path="/admin/login"
        element={<AdminLoginPage />}
      />

      <Route
        path="/admin"
        element={<AdminLayout />}
      >
        <Route
          index
          element={<DashboardPage />}
        />

        {/*
        Future Routes

        <Route
          path="products"
          element={<ProductsPage />}
        />

        <Route
          path="orders"
          element={<AdminOrdersPage />}
        />

        <Route
          path="categories"
          element={<CategoriesPage />}
        />

        <Route
          path="customers"
          element={<CustomersPage />}
        />

        <Route
          path="staff"
          element={<StaffPage />}
        />

        <Route
          path="analytics"
          element={<AnalyticsPage />}
        />

        <Route
          path="settings"
          element={<AdminSettingsPage />}
        />
        */}
      </Route>

      {/* ===================================== */}
      {/* CUSTOMER */}
      {/* ===================================== */}

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/products"
          element={<ProductListingPage />}
        />

        <Route
          path="/product/:slug"
          element={<ProductDetailsPage />}
        />

        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />

      </Route>

      {/* ===================================== */}
      {/* AUTH */}
      {/* ===================================== */}

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/verify-otp"
        element={<VerifyOtpPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      {/* ===================================== */}
      {/* USER */}
      {/* ===================================== */}

      <Route
        path="/profile"
        element={<ProfilePage />}
      />

      <Route
        path="/orders"
        element={<OrdersPage />}
      />

      <Route
        path="/wishlist"
        element={<WishlistPage />}
      />

      <Route
        path="/cart"
        element={<CartPage />}
      />

      <Route
        path="/messages"
        element={<MessagesPage />}
      />

      <Route
        path="/ai"
        element={<AiAssistantPage />}
      />

      <Route
        path="/addresses"
        element={<AddressesPage />}
      />

      <Route
        path="/settings"
        element={<SettingsPage />}
      />

    </Routes>
  );
}

export default AppRoutes;
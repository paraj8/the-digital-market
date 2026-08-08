import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// =====================================
// ADMIN


import AdminProtectedRoute from "../components/admin/auth/AdminProtectedRoute";
import AdminLayout from "../components/admin/layout/AdminLayout";

import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminOrdersPage from "../pages/admin/orders/AdminOrdersPage";
import AdminProductsPage from "../pages/admin/products/AdminProductsPage";
import AdminCategoriesPage from "../pages/admin/categories/AdminCategoriesPage";
import AdminCustomersPage from "../pages/admin/customers/AdminCustomersPage";
import AdminStaffPage from "../pages/admin/staff/AdminStaffPage";
import AdminCouponsPage from "../pages/admin/coupons/AdminCouponsPage";
import AdminAnalyticsPage from "../pages/admin/analytics/AdminAnalyticsPage";
import AdminSettingsPage from "../pages/admin/settings/AdminSettingsPage";

// ==================================ADMIN END====================================

// =====================================
// CUSTOMER
// =====================================

import HomePage from "../pages/home/HomePage";
import ProductDetailsPage from "../pages/product/ProductDetailsPage";
import ProductListingPage from "../pages/product/ProductListingPage";

import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import VerifyForgotPasswordOtpPage from "../pages/auth/VerifyForgotPasswordOtpPage";

import ProfilePage from "../pages/profile/ProfilePage";
import OrdersPage from "../pages/orders/OrdersPage";
import WishlistPage from "../pages/wishlist/WishlistPage";
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";

import MessagesPage from "../pages/messages/MessagesPage";
import AiAssistantPage from "../pages/ai/AiAssistantPage";
import AddressesPage from "../pages/addresses/AddressesPage";
import SettingsPage from "../pages/settings/SettingsPage";

// ================================CUSTOMER END====================================

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

      <Route element={<AdminProtectedRoute />}>
        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          {/* Dashboard */}
          <Route
            index
            element={<AdminDashboardPage />}
          />

          {/* Orders */}
          <Route
            path="orders"
            element={<AdminOrdersPage />}
          />
          
          {/* Products */}
          <Route
            path="products"
            element={<AdminProductsPage />}
          />

          <Route
            path="categories"
            element={<AdminCategoriesPage />}
          />

          <Route
            path="customers"
            element={<AdminCustomersPage />}
          />

          <Route
            path="staff"
            element={<AdminStaffPage />}
          />

          <Route
            path="coupons"
            element={<AdminCouponsPage />}
          />

          <Route
            path="analytics"
            element={<AdminAnalyticsPage />}
          />

          <Route
            path="settings"
            element={<AdminSettingsPage />}
          />

          
        </Route>
      </Route>

      {/* ===================================== */}
      {/* CUSTOMER MAIN */}
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
      {/* CUSTOMER AUTH */}
      {/* ===================================== */}

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage />}
      />

      <Route
        path="/verify-forgot-password-otp"
        element={<VerifyForgotPasswordOtpPage />}
      />

      <Route
        path="/reset-password"
        element={<ResetPasswordPage />}
      />

      {/* ===================================== */}
      {/* CUSTOMER USER */}
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
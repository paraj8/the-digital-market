import { Routes, Route } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

// =====================================
// ADMIN
// =====================================

import AdminProtectedRoute from "../../admin/components/auth/AdminProtectedRoute";
import AdminLayout from "../../admin/components/layout/AdminLayout";

import AdminLoginPage from "../../admin/pages/AdminLoginPage";
import AdminDashboardPage from "../../admin/pages/dashboard/AdminDashboardPage";
import AdminOrdersPage from "../../admin/pages/orders/AdminOrdersPage";
import AdminProductsPage from "../../admin/pages/products/AdminProductsPage";
import AdminCategoriesPage from "../../admin/pages/categories/AdminCategoriesPage";
import AdminCustomersPage from "../../admin/pages/customers/AdminCustomersPage";
import AdminStaffPage from "../../admin/pages/staff/AdminStaffPage";
import AdminCouponsPage from "../../admin/pages/coupons/AdminCouponsPage";
import AdminAnalyticsPage from "../../admin/pages/analytics/AdminAnalyticsPage";
import AdminSettingsPage from "../../admin/pages/settings/AdminSettingsPage";

// =====================================
// CUSTOMER
// =====================================

import HomePage from "../../pages/home/HomePage";
import ProductDetailsPage from "../../pages/product/ProductDetailsPage";
import ProductListingPage from "../../pages/product/ProductListingPage";

import RegisterPage from "../../pages/auth/RegisterPage";
import VerifyOtpPage from "../../pages/auth/VerifyOtpPage";
import LoginPage from "../../pages/auth/LoginPage";
import ForgotPasswordPage from "../../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/auth/ResetPasswordPage";
import VerifyForgotPasswordOtpPage from "../../pages/auth/VerifyForgotPasswordOtpPage";

import ProfilePage from "../../pages/profile/ProfilePage";
import OrdersPage from "../../pages/orders/OrdersPage";
import WishlistPage from "../../pages/wishlist/WishlistPage";
import CartPage from "../../pages/cart/CartPage";

import CheckoutPage from "../../pages/checkout/CheckoutPage";
import CheckoutReviewPage from "../../pages/checkout/CheckoutReviewPage";
import CheckoutPaymentStatusPage from "../../pages/checkout/CheckoutPaymentStatusPage";

import MessagesPage from "../../pages/messages/MessagesPage";
import AiAssistantPage from "../../pages/ai/AiAssistantPage";
import AddressesPage from "../../pages/addresses/AddressesPage";
import SettingsPage from "../../pages/settings/SettingsPage";

// =====================================
// APP ROUTES
// =====================================

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

          {/* Categories */}
          <Route
            path="categories"
            element={<AdminCategoriesPage />}
          />

          {/* Customers */}
          <Route
            path="customers"
            element={<AdminCustomersPage />}
          />

          {/* Staff */}
          <Route
            path="staff"
            element={<AdminStaffPage />}
          />

          {/* Coupons */}
          <Route
            path="coupons"
            element={<AdminCouponsPage />}
          />

          {/* Analytics */}
          <Route
            path="analytics"
            element={<AdminAnalyticsPage />}
          />

          {/* Settings */}
          <Route
            path="settings"
            element={<AdminSettingsPage />}
          />
        </Route>
      </Route>

      {/* ===================================== */}
      {/* CUSTOMER AUTH */}
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
      {/* CUSTOMER MAIN */}
      {/* ===================================== */}

      <Route element={<MainLayout />}>

        {/* Home */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* Products */}
        <Route
          path="/products"
          element={<ProductListingPage />}
        />

        {/* Product Details */}
        <Route
          path="/product/:slug"
          element={<ProductDetailsPage />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<ProfilePage />}
        />

        {/* Orders */}
        <Route
          path="/orders"
          element={<OrdersPage />}
        />

        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={<WishlistPage />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={<CartPage />}
        />

        {/* Messages */}
        <Route
          path="/messages"
          element={<MessagesPage />}
        />

        {/* AI Assistant */}
        <Route
          path="/ai"
          element={<AiAssistantPage />}
        />

        {/* Addresses */}
        <Route
          path="/addresses"
          element={<AddressesPage />}
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={<SettingsPage />}
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />

        {/* Checkout Review */}
        <Route
          path="/checkout/review"
          element={<CheckoutReviewPage />}
        />

        {/* Payment Status */}
        <Route
          path="/checkout/payment-status"
          element={<CheckoutPaymentStatusPage />}
        />

      </Route>

    </Routes>
  );
}

export default AppRoutes;
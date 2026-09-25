import { Routes, Route } from "react-router-dom";

import MainLayout from "../../user/layouts/MainLayout";

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

import HomePage from "../../user/pages/home/HomePage";
import ProductDetailsPage from "../../user/pages/product/ProductDetailsPage";
import ProductListingPage from "../../user/pages/product/ProductListingPage";

import RegisterPage from "../../user/pages/auth/RegisterPage";
import VerifyOtpPage from "../../user/pages/auth/VerifyOtpPage";
import LoginPage from "../../user/pages/auth/LoginPage";
import ForgotPasswordPage from "../../user/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../../user/pages/auth/ResetPasswordPage";
import VerifyForgotPasswordOtpPage from "../../user/pages/auth/VerifyForgotPasswordOtpPage";

import ProfilePage from "../../user/pages/account/profile/ProfilePage";
import OrdersPage from "../../user/pages/shopping/orders/OrdersPage";
import WishlistPage from "../../user/pages/shopping/wishlist/WishlistPage";
import CartPage from "../../user/pages/shopping/cart/CartPage";

import CheckoutPage from "../../user/pages/shopping/checkout/CheckoutPage";
import CheckoutReviewPage from "../../user/pages/shopping/checkout/CheckoutReviewPage";
import CheckoutPaymentStatusPage from "../../user/pages/shopping/checkout/CheckoutPaymentStatusPage";

import MessagesPage from "../../user/pages/communication/messages/MessagesPage";
import AiAssistantPage from "../../user/pages/communication/ai/AiAssistantPage";
import AddressesPage from "../../user/pages/account/addresses/AddressesPage";
import SettingsPage from "../../user/pages/account/settings/SettingsPage";
import OrderDetailsPage from "../../user/pages/shopping/orders/OrderDetailsPage";

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

        <Route
          path="/orders/:id"
          element={<OrderDetailsPage />}
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
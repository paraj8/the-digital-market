import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/home/HomePage";
import ProductDetailsPage from "../pages/product/ProductDetailsPage";
import RegisterPage from "../pages/auth/RegisterPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import VerifyForgotPasswordOtpPage from "../pages/auth/VerifyForgotPasswordOtpPage";
import ProfilePage from "../pages/profile/ProfilePage";
import OrdersPage from "../pages/orders/OrdersPage";
import WishlistPage from "../pages/wishlist/WishlistPage";
import CartPage from "../pages/cart/CartPage";
import MessagesPage from "../pages/messages/MessagesPage";
import AiAssistantPage from "../pages/ai/AiAssistantPage";
import AddressesPage from "../pages/addresses/AddressesPage";
import SettingsPage from "../pages/settings/SettingsPage";
import ProductListingPage from "../pages/product/ProductListingPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";

function AppRoutes() {
  return (
    <Routes>
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

              <Route
          path="/register"
          element={
            <RegisterPage />
          }
        />

        <Route
          path="/verify-otp"
          element={
            <VerifyOtpPage />
          }
        /> 

        <Route
          path="/login"
          element={
            <LoginPage />
          }
        />
        <Route 
        path="/forgot-password"
        element={
          <ForgotPasswordPage />
        }
        />
         <Route 
        path="/verify-forgot-password-otp"
        element={
          <VerifyForgotPasswordOtpPage />
        }
        />
         <Route 
        path="/reset-password"
        element={
          <ResetPasswordPage />
        }
        />

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
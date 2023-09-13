import { User } from "firebase/auth";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import RootLayout from "../layouts/root-layout/RootLayout";
import Home from "../pages/home";
import Dashboard from "../pages/dashboard";
import Profile from "../pages/profile";
import NotFound from "../pages/not-found";
import { SignUp, SignIn, SignOut, ForgotPassword } from "../pages/auth";
import { useAppSelector } from "../hooks/useAppStore";

const PrivateWrapper = ({ user }: { user: User | null }) => {
  return user ? <Outlet /> : <Navigate to="/" />;
};

const RedirectWrapper = ({ user }: { user: User | null }) => {
  return user ? <Navigate to="/" /> : <Outlet />;
};

const RootRoutes = () => {
  const authState = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateWrapper user={authState.user} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<RedirectWrapper user={authState.user} />}>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route element={<PrivateWrapper user={authState.user} />}>
        <Route path="/sign-out" element={<SignOut />} />
      </Route>
    </Routes>
  );
};

export default RootRoutes;

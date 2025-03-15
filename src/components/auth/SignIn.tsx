import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../common/Form/FormInput";
import { SignInInput, signInSchema } from "../../lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { AuthErrorMessage } from "./AuthErrorMessage";
import { FormCheckbox } from "../common/Form/FormCheckbox";

import AuthSidebar from "./AuthSidebar";
import FormAnimation from "./FormAnimation";
import { useToast } from "../../hooks/useToast";
import { ROUTES } from "../../constants/Routes";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast(); // Custom toast function
  const [localError, setLocalError] = useState<string | null>(null);

  const {
    login,

    clearError,
    resetLoading,
    loading,
    rememberMe,
    setRememberMe,
  } = useAuth();
  useEffect(() => {
    if (location.state?.message) {
      showToast(location.state.message, "success");
    }
  }, [location, showToast]);

  const methods = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: SignInInput) => {
    setLocalError(null);
    const loginError = await login(data.email, data.password);

    if (loginError) {
      setLocalError(loginError);
      return;
    }
    const from = (location.state as any)?.from?.pathname || "/dashboard";
    navigate(from, { replace: true });
  };
  const handleNavigation = (path: string) => {
    resetLoading();
    clearError();
    navigate(path);
  };
  return (
    <div className="d-flex min-vh-100">
      {/* Left Sidebar with Animation */}
      <div className="col-lg-5 col-md-5 d-none d-md-block">
        <AuthSidebar
          title="Welcome back!"
          subtitle="Sign in to continue building amazing forms."
          animationComponent={<FormAnimation />}
        />
      </div>

      {/* Right Content Area */}
      <div className="col-lg-7 col-md-7 col-12 d-flex justify-content-center align-items-center bg-light">
        <div
          className="card shadow-sm border-0"
          style={{ maxWidth: "450px", width: "100%" }}
        >
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4 d-block d-md-none">
              <img
                src={logo}
                alt="Formatic Logo"
                className="mb-3"
                style={{ height: "32px" }}
              />
            </div>

            <h4 className="fw-bold mb-1 text-center">Sign in to Formatic</h4>
            <p className="text-secondary mb-4 text-center">
              Please enter your details to continue
            </p>

            <div className="position-relative my-4">
              <hr className="text-secondary" />
              <span className="position-absolute top-50 start-50 translate-middle px-3 bg-white text-secondary">
                or
              </span>
            </div>

            <AuthErrorMessage error={localError} />

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput name="email" label="Email Address" type="email" />

                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  showPasswordToggle={true}
                />

                <button
                  type="submit"
                  className="btn formatic-btn-primary w-100 py-2"
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
            </FormProvider>

            <p className="text-center mt-4">
              Don't have an account?{" "}
              <a
                onClick={() => handleNavigation(ROUTES.SIGNUP)}
                className="text-decoration-none"
                style={{ color: "var(--color-500)", cursor: "pointer" }}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
function showToast(message: any, arg1: string) {
  throw new Error("Function not implemented.");
}

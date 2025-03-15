import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpInput, signUpSchema } from "../../lib/validation/auth";

import { FormInput } from "../common/Form/FormInput";
import { FormCheckbox } from "../common/Form/FormCheckbox";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/Routes";
import { AuthErrorMessage } from "./AuthErrorMessage";

import AuthSidebar from "./AuthSidebar";
import FormAnimation from "./FormAnimation";
import SignupConfirmation from "./SignupConfirmation";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signup, clearError, resetLoading, loading } = useAuth();
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const methods = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const { getValues } = methods;

  const onSubmit = async (data: SignUpInput) => {
    clearError();
    setLocalError(null);

    const signupError = await signup(data.email, data.password, data.fullName);

    if (signupError) {
      setLocalError(signupError);
      return;
    }
    setIsSignedUp(true);
  };
  const handleNavigation = () => {
    resetLoading();
    clearError();
    navigate("/auth/signin");
  };
  // Render verification screen if user has signed up but not verified
  if (isSignedUp) {
    return <SignupConfirmation />;
  }

  return (
    <div className="d-flex min-vh-100">
      {/* Left Sidebar with Animation */}
      <div className="col-lg-5 col-md-5 d-none d-md-block">
        <AuthSidebar
          title="Create your account"
          subtitle="Join thousands of developers building amazing forms."
          animationComponent={<FormAnimation isSignUp={true} />}
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

            <h4 className="fw-bold mb-1 text-center">
              Get started with Formatic
            </h4>
            <p className="text-secondary mb-4 text-center">
              Start building amazing forms today
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
                <FormInput name="fullName" label="Full Name" type="text" />

                <FormInput name="email" label="Email Address" type="email" />

                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  showPasswordToggle={true}
                />

                <div className="mb-3">
                  <FormCheckbox
                    name="terms"
                    label={
                      <span className="text-secondary">
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-decoration-none"
                          style={{ color: "var(--color-500)" }}
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="text-decoration-none"
                          style={{ color: "var(--color-500)" }}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    }
                  />
                </div>

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
                      Creating account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </button>
              </form>
            </FormProvider>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <a
                onClick={handleNavigation}
                className="text-decoration-none"
                style={{ color: "var(--color-500)", cursor: "pointer" }}
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

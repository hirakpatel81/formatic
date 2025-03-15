import React, { Component, ErrorInfo } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Here you can log to an error reporting service like Sentry
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
          <div className="text-center p-4">
            <h1 className="display-4 mb-4">Oops, something went wrong</h1>
            <p className="lead mb-4">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>

            {this.state.error && (
              <div className="alert alert-danger text-start mb-4">
                <h5>Error Details:</h5>
                <pre className="mb-0">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}

            <div className="d-flex gap-3 justify-content-center">
              <button
                className="btn formatic-btn-primary"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
              <Link to="/" className="btn btn-outline-secondary">
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;

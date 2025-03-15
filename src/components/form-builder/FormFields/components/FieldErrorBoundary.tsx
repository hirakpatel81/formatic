import React, { Component, ErrorInfo } from "react";

interface Props {
  fieldName: string;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class FieldErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Field Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="field-error p-3 border border-danger rounded bg-danger bg-opacity-10">
          <div className="d-flex align-items-center gap-2 text-danger">
            <i className="fas fa-exclamation-triangle"></i>
            <h6 className="mb-0">Failed to render {this.props.fieldName}</h6>
          </div>
          {process.env.NODE_ENV === "development" && (
            <pre className="mt-2 small text-danger">
              {this.state.error?.message}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

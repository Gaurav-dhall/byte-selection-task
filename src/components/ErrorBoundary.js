import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // This method is called when an error is thrown in a child component.
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // This method logs the error and error information (useful for logging).
  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
    // Optionally, log this error to an external service like Sentry.
  }

  render() {
    // If an error is caught, render the fallback UI.
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    // If no error, render the children (the component wrapped inside ErrorBoundary).
    return this.props.children;
  }
}

export default ErrorBoundary;

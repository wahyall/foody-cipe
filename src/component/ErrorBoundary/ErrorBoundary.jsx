import React from 'react';

// Page
import Error from '../../page/Error/Error';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Error />
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
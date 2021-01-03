import React, { PureComponent } from 'react';
import { ProgressWidget } from 'enl-components';

class PerformanceStatus extends PureComponent {
  render() {
    return (
      <div>
        <ProgressWidget />
      </div>
    );
  }
}

export default PerformanceStatus;

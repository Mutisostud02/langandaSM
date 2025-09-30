import { useEffect, useState } from 'react';

const PerformanceMonitor = () => {
  const [performanceData, setPerformanceData] = useState(null);
  const [loadingIssues, setLoadingIssues] = useState([]);

  useEffect(() => {
    // Monitor page load performance
    const checkPerformance = () => {
      if (performance && performance.timing) {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
        
        setPerformanceData({
          loadTime: Math.round(loadTime),
          domReady: Math.round(domReady),
          navigationStart: timing.navigationStart,
          loadEventEnd: timing.loadEventEnd
        });
      }
    };

    // Check for failed resources
    const checkFailedResources = () => {
      const failedResources = [];
      const entries = performance.getEntriesByType('resource');
      
      entries.forEach(entry => {
        if (entry.duration === 0 && entry.transferSize === 0) {
          failedResources.push({
            name: entry.name,
            type: entry.initiatorType,
            duration: entry.duration
          });
        }
      });
      
      if (failedResources.length > 0) {
        setLoadingIssues(failedResources);
      }
    };

    // Wait for page to fully load
    if (document.readyState === 'complete') {
      checkPerformance();
      checkFailedResources();
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          checkPerformance();
          checkFailedResources();
        }, 1000);
      });
    }

    // Monitor for errors
    window.addEventListener('error', (e) => {
      console.error('Resource loading error:', e);
    });

    // Monitor for unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e);
    });
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4 style={{ margin: '0 0 10px 0' }}>Performance Monitor</h4>
      {performanceData && (
        <div>
          <div>Load Time: {performanceData.loadTime}ms</div>
          <div>DOM Ready: {performanceData.domReady}ms</div>
        </div>
      )}
      {loadingIssues.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <div style={{ color: '#ff6b6b' }}>
            Failed Resources: {loadingIssues.length}
          </div>
          {loadingIssues.slice(0, 3).map((issue, index) => (
            <div key={index} style={{ fontSize: '10px', marginTop: '5px' }}>
              {issue.name.split('/').pop()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;

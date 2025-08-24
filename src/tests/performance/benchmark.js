const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const { generateReport } = require('./report-generator');

const PERFORMANCE_THRESHOLDS = {
  'first-contentful-paint': 1800,
  'speed-index': 2500,
  'largest-contentful-paint': 2500,
  'time-to-interactive': 3800,
  'total-blocking-time': 200,
  'cumulative-layout-shift': 0.1
};

async function runLighthouseAudit(url) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
  });

  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance'],
    port: chrome.port
  };

  const runnerResult = await lighthouse(url, options);
  const reportJson = runnerResult.report;
  await chrome.kill();

  return JSON.parse(reportJson);
}

async function runPerformanceTests() {
  console.log('Starting performance tests...');

  const testUrls = [
    'http://localhost:3000/',              // Landing page
    'http://localhost:3000/diagnosis',     // Diagnosis page
    'http://localhost:3000/recommendations' // Recommendations page
  ];

  const results = [];

  for (const url of testUrls) {
    console.log(`Testing ${url}...`);
    
    try {
      const report = await runLighthouseAudit(url);
      const metrics = report.audits;
      
      const performanceScore = report.categories.performance.score * 100;
      console.log(`Performance Score: ${performanceScore}%`);

      const testResult = {
        url,
        performanceScore,
        metrics: {
          'First Contentful Paint': metrics['first-contentful-paint'].numericValue,
          'Speed Index': metrics['speed-index'].numericValue,
          'Largest Contentful Paint': metrics['largest-contentful-paint'].numericValue,
          'Time to Interactive': metrics['interactive'].numericValue,
          'Total Blocking Time': metrics['total-blocking-time'].numericValue,
          'Cumulative Layout Shift': metrics['cumulative-layout-shift'].numericValue
        },
        passes: true,
        failures: []
      };

      // Check against thresholds
      Object.entries(PERFORMANCE_THRESHOLDS).forEach(([metric, threshold]) => {
        const value = metrics[metric].numericValue;
        if (value > threshold) {
          testResult.passes = false;
          testResult.failures.push({
            metric,
            value,
            threshold,
            diff: value - threshold
          });
        }
      });

      results.push(testResult);
    } catch (error) {
      console.error(`Error testing ${url}:`, error);
      results.push({
        url,
        error: error.message
      });
    }
  }

  // Generate report
  await generateReport(results);

  // Check if all tests passed
  const allPassed = results.every(result => result.passes);
  if (!allPassed) {
    console.error('Some performance tests failed. See report for details.');
    process.exit(1);
  }

  console.log('All performance tests passed!');
}

// Custom metrics tracking
const trackCustomMetrics = () => {
  const metrics = {
    resourceLoading: {},
    userInteractions: {},
    renderingPerformance: {}
  };

  // Resource loading
  performance.getEntriesByType('resource').forEach(entry => {
    metrics.resourceLoading[entry.name] = {
      duration: entry.duration,
      size: entry.transferSize,
      type: entry.initiatorType
    };
  });

  // User interactions
  const interactionObserver = new PerformanceObserver(list => {
    list.getEntries().forEach(entry => {
      metrics.userInteractions[entry.name] = {
        duration: entry.duration,
        startTime: entry.startTime
      };
    });
  });
  interactionObserver.observe({ entryTypes: ['measure'] });

  // Rendering performance
  const paintObserver = new PerformanceObserver(list => {
    list.getEntries().forEach(entry => {
      metrics.renderingPerformance[entry.name] = entry.startTime;
    });
  });
  paintObserver.observe({ entryTypes: ['paint'] });

  return metrics;
};

// Memory usage tracking
const trackMemoryUsage = () => {
  if (performance.memory) {
    return {
      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
      usedJSHeapSize: performance.memory.usedJSHeapSize
    };
  }
  return null;
};

// Network request tracking
const trackNetworkRequests = () => {
  const requests = [];
  
  const observer = new PerformanceObserver(list => {
    list.getEntries().forEach(entry => {
      requests.push({
        url: entry.name,
        duration: entry.duration,
        size: entry.transferSize,
        type: entry.initiatorType
      });
    });
  });
  
  observer.observe({ entryTypes: ['resource'] });
  return requests;
};

module.exports = {
  runPerformanceTests,
  trackCustomMetrics,
  trackMemoryUsage,
  trackNetworkRequests
};
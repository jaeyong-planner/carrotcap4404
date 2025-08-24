const fs = require('fs').promises;
const path = require('path');

async function generateReport(results) {
  const reportDate = new Date().toISOString();
  const reportDir = path.join(__dirname, '../../reports/performance');
  const reportPath = path.join(reportDir, `performance-report-${reportDate}.html`);

  const reportContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Performance Test Report - ${reportDate}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            color: #333;
        }
        
        .header {
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #eee;
        }
        
        .summary {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 2rem;
        }
        
        .test-result {
            margin-bottom: 2rem;
            padding: 1rem;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
        
        .pass {
            border-left: 4px solid #34C759;
        }
        
        .fail {
            border-left: 4px solid #FF3B30;
        }
        
        .metric {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 0.5rem;
        }
        
        .failures {
            background: #fff5f5;
            padding: 1rem;
            border-radius: 4px;
            margin-top: 1rem;
        }
        
        .chart-container {
            margin: 2rem 0;
            height: 400px;
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="header">
        <h1>Performance Test Report</h1>
        <p>Generated: ${new Date(reportDate).toLocaleString()}</p>
    </div>
    
    <div class="summary">
        <h2>Summary</h2>
        <p>Total Tests: ${results.length}</p>
        <p>Passed: ${results.filter(r => r.passes).length}</p>
        <p>Failed: ${results.filter(r => !r.passes).length}</p>
    </div>
    
    <div class="results">
        ${results.map(result => `
            <div class="test-result ${result.passes ? 'pass' : 'fail'}">
                <h3>${result.url}</h3>
                <p>Performance Score: ${result.performanceScore}%</p>
                
                <h4>Metrics:</h4>
                ${Object.entries(result.metrics).map(([key, value]) => `
                    <div class="metric">
                        <span>${key}:</span>
                        <span>${Math.round(value)}ms</span>
                    </div>
                `).join('')}
                
                ${result.failures.length > 0 ? `
                    <div class="failures">
                        <h4>Failures:</h4>
                        ${result.failures.map(failure => `
                            <p>${failure.metric}: ${Math.round(failure.value)}ms 
                               (Threshold: ${failure.threshold}ms, 
                               Exceeded by: ${Math.round(failure.diff)}ms)</p>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `).join('')}
    </div>
    
    <div class="chart-container">
        <canvas id="metricsChart"></canvas>
    </div>
    
    <script>
        const ctx = document.getElementById('metricsChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ${JSON.stringify(results.map(r => new URL(r.url).pathname))},
                datasets: [{
                    label: 'Performance Score',
                    data: ${JSON.stringify(results.map(r => r.performanceScore))},
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    </script>
</body>
</html>
  `;

  // Ensure reports directory exists
  await fs.mkdir(reportDir, { recursive: true });
  
  // Write report
  await fs.writeFile(reportPath, reportContent);
  
  console.log(`Report generated: ${reportPath}`);
}

module.exports = {
  generateReport
};
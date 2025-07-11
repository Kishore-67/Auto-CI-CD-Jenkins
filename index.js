// const express = require('express');
// const promClient = require('prom-client');
// const app = express();
// const port = 5000;

// // Metrics setup
// const counter = new promClient.Counter({
//   name: 'webapp_requests_total',
//   help: 'Total number of requests to the web app'
// });

// promClient.collectDefaultMetrics();

// // Root route
// app.get('/', (req, res) => {
//   counter.inc();
//   res.send(`<h1 style="color:teal;">second new hi ...</h1>`);
// });

// // Prometheus metrics route
// app.get('/metrics', async (req, res) => {
//   res.set('Content-Type', promClient.register.contentType);
//   res.end(await promClient.register.metrics());
// });

// app.listen(port, () => {
//   console.log(`App running at http://localhost:${port}`);
// });
const express = require('express');
const promClient = require('prom-client');
const app = express();
const port = 5000;

// Metrics setup
const counter = new promClient.Counter({
  name: 'webapp_requests_total',
  help: 'Total number of requests to the web app',
});

promClient.collectDefaultMetrics();

app.get('/', (req, res) => {
  counter.inc();

  const html = `
    <html>
      <head>
        <title>Node.js Monitoring App</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            text-align: center;
            padding: 50px;
          }
          h1 {
            color: teal;
          }
          .content {
            margin: 20px auto;
            max-width: 600px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }
          .btn {
            background-color: teal;
            border: none;
            color: white;
            padding: 10px 20px;
            margin-top: 15px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
          }
          a {
            color: #1e90ff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="content">
          <h1>🚀 Node.js Monitoring App</h1>
          <p>This application is monitored using <strong>Prometheus</strong> metrics.</p>
          <p>Every time you refresh this page, a request counter is incremented and exposed at <a href="/metrics" target="_blank">/metrics</a>.</p>
          <p>Metrics collected include default system stats (CPU, memory, event loop lag) and custom counters.</p>
          <form method="get" action="/">
            <button class="btn" type="submit">Simulate Request 🔄</button>
          </form>
          <p style="margin-top: 20px;"><a href="/metrics" target="_blank">View Prometheus Metrics</a></p>
        </div>
      </body>
    </html>
  `;

  res.send(html);
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

app.listen(port, () => {
  console.log(`✅ App running at http://localhost:${port}`);
});

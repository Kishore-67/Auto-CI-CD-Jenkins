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
  help: 'Total number of requests to the web app'
});

promClient.collectDefaultMetrics();

// Root route with UI
app.get('/', (req, res) => {
  counter.inc();

  res.send(`
    <html>
      <head>
        <title>DevOps v2</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; color: #333; }
          h1 { color: teal; }
          pre { background: #eee; padding: 10px; border-radius: 5px; }
          .step { margin: 10px 0; padding: 10px; background: #fff; border-left: 4px solid teal; box-shadow: 0 0 5px rgba(0,0,0,0.1); }
        </style>
      </head>
      <body>
        <h1>🚀 Welcome to Kishore's DevOps App</h1>
        <p>This app shows how a complete CI/CD pipeline works using:</p>
        <pre>
GitHub -> Webhook -> Jenkins -> Docker Build -> Kubernetes (Minikube)
        </pre>

        <div class="step">
          <strong>1️⃣ GitHub:</strong> Code is pushed to a GitHub repo.
        </div>
        <div class="step">
          <strong>2️⃣ Webhook:</strong> A webhook notifies Jenkins when code is pushed.
        </div>
        <div class="step">
          <strong>3️⃣ Jenkins:</strong> Jenkins builds a Docker image and pushes it to DockerHub.
        </div>
        <div class="step">
          <strong>4️⃣ Docker:</strong> Image is built and tagged as <code>kishore67/testapp:latest</code>.
        </div>
        <div class="step">
          <strong>5️⃣ Kubernetes (Minikube):</strong> Jenkins deploys the image using <code>kubectl apply</code>.
        </div>

        <p>✅ App exposes:</p>
        <ul>
          <li><code>/</code> — This UI page</li>
          <li><code>/metrics</code> — Prometheus-compatible metrics endpoint</li>
        </ul>

        <p>🔁 Requests so far: <strong>${counter.hashMap[''].value}</strong></p>
      </body>
    </html>
  `);
});

// Prometheus metrics route
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

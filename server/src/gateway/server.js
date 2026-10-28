
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = Number(process.env.PORT) || 5000;

const servicesUrl =
  process.env.SERVICES_SERVICE_URL || 'http://localhost:5001';

const homeServiceUrl =
  process.env.HOME_SERVICE_URL || 'http://localhost:5002';

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  })
);

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'api-gateway',
    status: 'running',
  });
});

// Common proxy function
async function proxyRequest(req, res, serviceUrl, serviceName, basePath) {
  try {
    const suffix = req.url === '/' ? '' : req.url;
    const targetUrl = `${serviceUrl}${basePath}${suffix}`;

    const hasBody = !['GET', 'HEAD'].includes(req.method);

    const headers = {
      accept: req.get('accept') || 'application/json',
    };

    if (hasBody) {
      headers['content-type'] = 'application/json';
    }

    if (req.get('authorization')) {
      headers.authorization = req.get('authorization');
    }

    const upstreamResponse = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: hasBody ? JSON.stringify(req.body) : undefined,
      signal: AbortSignal.timeout(5000),
    });

    const responseBody = await upstreamResponse.text();

    res.status(upstreamResponse.status);

    const contentType = upstreamResponse.headers.get('content-type');

    if (contentType) {
      res.set('content-type', contentType);
    }

    return res.send(responseBody);
  } catch (error) {
    console.error(`${serviceName} unavailable:`, error.message);

    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      return res.status(504).json({
        success: false,
        message: `${serviceName} took too long to respond`,
      });
    }

    return res.status(502).json({
      success: false,
      message: `${serviceName} is currently unavailable`,
    });
  }
}

// Services Service: port 5001
app.use('/api/services', (req, res) => {
  return proxyRequest(
    req,
    res,
    servicesUrl,
    'Services Service',
    '/api/services'
  );
});

// Home Service: port 5002
app.use('/api/banners', (req, res) => {
  return proxyRequest(
    req,
    res,
    homeServiceUrl,
    'Home Service',
    '/api/banners'
  );
});

app.use('/api/highlights', (req, res) =>
  proxyRequest(
    req,
    res,
    homeServiceUrl,
    'Home Service',
    '/api/highlights'
  )
);

app.listen(PORT, () => {
  console.log(`API Gateway running at http://localhost:${PORT}`);
});


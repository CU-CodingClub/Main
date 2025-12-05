// server/index.ts - FINAL WORKING VERSION
import dotenv from "dotenv";

// Simple dotenv config
dotenv.config();

console.log("🔧 BREVO_API_KEY:", process.env.BREVO_API_KEY ? "✅ Found" : "❌ Not found");

// Rest of imports
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { initializeEmailService } from "./email";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

// Add test email endpoint before other routes
app.get("/api/test-email", async (req: Request, res: Response) => {
  try {
    const { sendEmail } = await import("./email");
    
    const success = await sendEmail(
      "test@example.com",
      "🚀 Brevo API Test - Hackathon Website",
      `<h1>Test Email</h1><p>Brevo API is working!</p>`
    );
    
    res.json({ 
      success, 
      message: "Test email sent via Brevo API",
      timestamp: new Date().toISOString(),
      service: "Brevo API"
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      error: error.message,
      message: "Email test failed",
      timestamp: new Date().toISOString()
    });
  }
});

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    service: 'Hackathon Platform',
    emailService: 'Brevo API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

(async () => {
  // Initialize email service
  try {
    const emailInitialized = await initializeEmailService();
    
    if (emailInitialized) {
      log("✅ Brevo API email service initialized successfully", "email");
    } else {
      log("⚠️  Email service running in console mode", "email");
    }
  } catch (error) {
    log(`❌ Email service error: ${error}`, "email");
  }

  // Register application routes
  await registerRoutes(httpServer, app);

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    log(`❌ Error: ${message} (Status: ${status})`, "error");
    
    res.status(status).json({ 
      message,
      success: false,
      timestamp: new Date().toISOString()
    });
  });

  // Static file serving
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
    log("✅ Production mode - static files serving enabled", "static");
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
    log("✅ Development mode - Vite server enabled", "vite");
  }

  // Server startup
  const port = parseInt(process.env.PORT || "8000", 10);
const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
  
 httpServer.listen(port, host, () => {
    log(`🚀 Hackathon server running on port ${port}`, "server");
    log(`📧 Email test: http://localhost:${port}/api/test-email`, "endpoints");
    log(`❤️  Health check: http://localhost:${port}/api/health`, "endpoints");
    
    if (process.env.BREVO_API_KEY) {
      log(`✅ Brevo API Key: Configured`, "email");
    } else {
      log(`❌ Brevo API Key: Not found`, "email");
    }
  });
})();














// server/index.ts - COMPLETE WORKING VERSION FOR RENDER (REPLACE THIS FILE ONLY)
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

console.log("🔧 Environment Check:");
console.log("🔧 BREVO_API_KEY:", process.env.BREVO_API_KEY ? "✅ Found" : "❌ Not found");
console.log("🔧 NODE_ENV:", process.env.NODE_ENV || 'development');
console.log("🔧 PORT:", process.env.PORT || '10000');

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

// FIX 1: Handle MongoDB connection without crashing
try {
  // Don't connect to MongoDB automatically - let routes handle it
  console.log("ℹ️ MongoDB connection will be attempted by individual routes if needed");
} catch (error) {
  console.log("⚠️ MongoDB not available - running in limited mode");
}

// FIX 2: Add test email endpoint
app.get("/api/test-email", async (req: Request, res: Response) => {
  try {
    const { sendEmail } = await import("./email");
    const success = await sendEmail(
      "test@example.com",
      "🚀 Brevo API Test",
      `<h1>Test Email</h1><p>Brevo API is working!</p>`
    );
    res.json({ 
      success, 
      message: "Test email sent",
      timestamp: new Date().toISOString()
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

// FIX 3: Health check endpoint (WORKS WITHOUT MONGODB)
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    service: 'Hackathon Platform',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// FIX 4: Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({ 
    message: "Hackathon Platform API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      testEmail: "/api/test-email",
      status: "Running"
    }
  });
});

(async () => {
  try {
    // Initialize email service
    try {
      const emailInitialized = await initializeEmailService();
      if (emailInitialized) {
        log("✅ Email service initialized", "email");
      } else {
        log("⚠️ Email service in console mode", "email");
      }
    } catch (error: any) {
      log(`⚠️ Email service error: ${error.message}`, "email");
    }

    // Register routes
    await registerRoutes(httpServer, app);

    // Error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log(`❌ Error: ${message}`, "error");
      res.status(status).json({ 
        message,
        success: false,
        timestamp: new Date().toISOString()
      });
    });

    // Static files
    if (process.env.NODE_ENV === "production") {
      serveStatic(app);
      log("✅ Static files enabled", "static");
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
      log("✅ Vite server enabled", "vite");
    }

    // FIX 5: CRITICAL - Server startup for Render
    const port = parseInt(process.env.PORT || "10000", 10);
    
    // MUST use "0.0.0.0" on Render
    httpServer.listen(port, "0.0.0.0", () => {
      log(`🚀 Server running on port ${port}`, "server");
      log(`📧 Test: http://localhost:${port}/api/test-email`, "endpoints");
      log(`❤️ Health: http://localhost:${port}/api/health`, "endpoints");
      
      if (process.env.BREVO_API_KEY) {
        log(`✅ Brevo API: Configured`, "services");
      }
    });

  } catch (error: any) {
    console.error(`❌ Startup error: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
})();

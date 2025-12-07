// server/index.ts - COMPLETE WORKING VERSION FOR RENDER
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

console.log("🔧 Environment Check:");
console.log("🔧 BREVO_API_KEY:", process.env.BREVO_API_KEY ? "✅ Found" : "❌ Not found");
console.log("🔧 MONGODB_URI:", process.env.MONGODB_URI ? "✅ Found" : "❌ Not found (This is expected if not using MongoDB)");
console.log("🔧 NODE_ENV:", process.env.NODE_ENV || 'development');
console.log("🔧 PORT:", process.env.PORT || '10000');

// Test MongoDB connection if configured
import { MongoClient } from 'mongodb';
if (process.env.MONGODB_URI) {
  console.log("🔧 Testing MongoDB connection...");
  (async () => {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      // Set timeout for connection
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 10000)
      );
      
      await Promise.race([client.connect(), timeoutPromise]);
      console.log("✅ MongoDB connection successful!");
      await client.close();
    } catch (error: any) {
      console.log(`⚠️ MongoDB connection failed: ${error.message}`);
      console.log("⚠️ Running in fallback mode - data will be stored in memory");
    }
  })();
}

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

// Test email endpoint
app.get("/api/test-email", async (req: Request, res: Response) => {
  try {
    const { sendEmail } = await import("./email");
    const success = await sendEmail(
      "test@example.com",
      "🚀 Brevo API Test",
      `<h1>Test Email</h1><p>Brevo API is working!</p>`
    );
    res.json({ 
      success: true,
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

// Health check endpoint (ALWAYS WORKS - NO DATABASE DEPENDENCY)
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    service: 'Hackathon Platform',
    emailService: process.env.BREVO_API_KEY ? 'Configured' : 'Not configured',
    database: process.env.MONGODB_URI ? 'Configured' : 'Memory Storage',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime()
  });
});

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({ 
    message: "Hackathon Platform API",
    version: "1.0.0",
    status: "Running",
    endpoints: {
      health: "/api/health",
      testEmail: "/api/test-email",
      signup: "POST /api/auth/signup",
      login: "POST /api/auth/login",
      adminLogin: "POST /api/admin/login"
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
   if (process.env.NODE_ENV === "production" || process.env.RENDER) {
      serveStatic(app);
      log("✅ Production mode - static files serving enabled", "static");
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
      log("✅ Development mode - Vite server enabled", "vite");
    }

    // Server startup - CRITICAL FOR RENDER
    const port = parseInt(process.env.PORT || "10000", 10);
    
    // MUST use "0.0.0.0" on Render
    httpServer.listen(port, "0.0.0.0", () => {
      const serverUrl = `https://main-1-f6co.onrender.com`;
      
      log(`🚀 Server started successfully!`, "server");
      log(`📍 Port: ${port}`, "server");
      log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`, "server");
      log(`🔗 URL: ${serverUrl}`, "server");
      log(`📧 Test Email: ${serverUrl}/api/test-email`, "endpoints");
      log(`❤️ Health Check: ${serverUrl}/api/health`, "endpoints");
      log(`🏠 Home: ${serverUrl}/`, "endpoints");
      
      // Service status
      if (process.env.BREVO_API_KEY) {
        log(`✅ Brevo API: Configured`, "services");
      } else {
        log(`⚠️ Brevo API: Not configured`, "services");
      }
      
      if (process.env.MONGODB_URI) {
        log(`✅ MongoDB: Configured`, "services");
      } else {
        log(`⚠️ MongoDB: Not configured - running in memory mode`, "services");
      }
    });

  } catch (error: any) {
    console.error(`❌ Fatal startup error: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
})();

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error(`🚨 Uncaught Exception: ${error.message}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(`🚨 Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

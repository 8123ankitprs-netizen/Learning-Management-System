import React, { useState, useEffect } from 'react';
import { FileText, Download, ShieldCheck, FileCode, Server, Sparkles, Plus, Trash2, FileDown, Printer, Edit3 } from 'lucide-react';

const Notes = () => {
  // Pre-configured study guides data with complete detailed revision text
  const notesList = [
    {
      id: 1,
      title: 'Modern React Cheat Sheet (V19)',
      subject: 'Frontend Web Dev',
      description: 'Quick reference sheet covering Hooks lifecycle, Server Components syntax, Suspense patterns, and Actions API handlers.',
      pages: '4 pages',
      fileSize: '1.2 MB',
      icon: FileCode,
      detailedContent: `<div class="page cover-page">
        <div class="header-info">SKILLCRAFT ACADEMY PRESS</div>
        <h1 class="cover-title">MODERN REACT V19</h1>
        <div class="cover-subtitle">COMPREHENSIVE CHEAT SHEET & REFERENCE GUIDE</div>
        <p style="color: #64748b; font-size: 14px; max-width: 500px; margin: 0 auto;">Revision notes on the React Compiler, use() hook, forms Actions API, dynamic state hooks, and client/server directive guidelines.</p>
        <div class="footer-watermark" style="margin-top: 100px;">Verified study resource. Author: Ankit Prasad</div>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 2: The React Compiler & Auto-memoization</h1>
        <p>In previous versions of React, developers manually optimized renders using <code>useMemo</code>, <code>useCallback</code>, and the <code>memo</code> HOC. React 19 introduces the **React Compiler** (formerly React Forget), which parses components at build-time and inserts automatic dependency memoization hooks.</p>
        
        <div class="alert">
          <strong>Key Rule:</strong> Do not write manual memoization APIs in React 19 unless necessary. The compiler automatically optimizes render paths, saving bundle size and reducing mental overhead.
        </div>

        <h3>Code Example: Old Manual Optimization vs New Automatic</h3>
        <pre>
// BEFORE (React 18):
const ExpensiveComponent = memo(({ items, filter }) => {
  const filtered = useMemo(() => items.filter(filter), [items, filter]);
  return &lt;div&gt;{filtered.length} items&lt;/div&gt;;
});

// AFTER (React 19 - Standard syntax compiles automatically):
const ExpensiveComponent = ({ items, filter }) => {
  const filtered = items.filter(filter);
  return &lt;div&gt;{filtered.length} items&lt;/div&gt;;
};
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 3: Asynchronous Resources and the use() API</h1>
        <p>React 19 introduces a unified <code>use()</code> API that resolves asynchronous resources (like Promises) or reads Context stores directly inside render blocks. Unlike traditional hooks, <code>use()</code> can be called conditionally, inside loops, or after early return statements.</p>
        
        <h3>1. Resolving Promises inline:</h3>
        <pre>
import { use } from 'react';

const UserList = ({ dataPromise }) => {
  // Resolves promise directly in render.
  // Must be wrapped in a &lt;Suspense&gt; fallback boundary.
  const users = use(dataPromise);
  return (
    &lt;ul&gt;
      {users.map(u => &lt;li key={u.id}&gt;{u.name}&lt;/li&gt;)}
    &lt;/ul&gt;
  );
};
        </pre>

        <h3>2. Conditional Context Consumption:</h3>
        <pre>
const ThemeWidget = ({ showTheme }) => {
  if (showTheme) {
    const theme = use(ThemeContext); // Valid in React 19!
    return &lt;div style={{ color: theme.color }}&gt;Active Theme&lt;/div&gt;;
  }
  return &lt;div&gt;Minimal View&lt;/div&gt;;
};
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 4: Form Actions and Optimistic Updates API</h1>
        <p>React 19 introduces **Actions** to simplify async data submissions, managing loading states, error boundaries, and optimistic interface changes natively.</p>

        <table class="table-grid">
          <thead>
            <tr>
              <th>Hook API</th>
              <th>Primary Purpose</th>
              <th>Common Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>useActionState</code></td>
              <td>Tracks status and return payload of form actions.</td>
              <td>Handling async submission errors and state.</td>
            </tr>
            <tr>
              <td><code>useFormStatus</code></td>
              <td>Accesses parent &lt;form&gt; submit status.</td>
              <td>Disabling submit button while uploading.</td>
            </tr>
            <tr>
              <td><code>useOptimistic</code></td>
              <td>Instantly updates UI before server responds.</td>
              <td>Sending chat messages or liking posts.</td>
            </tr>
          </tbody>
        </table>

        <h3>Code Example: Form Action Handler</h3>
        <pre>
import { useActionState } from 'react';

async function updateProfile(prevState, formData) {
  try {
    await api.post('/profile', { name: formData.get('name') });
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function ProfileForm() {
  const [state, formAction, isPending] = useActionState(updateProfile, null);
  return (
    &lt;form action={formAction}&gt;
      &lt;input name="name" type="text" /&gt;
      &lt;button disabled={isPending}&gt;Submit&lt;/button&gt;
      {state?.error && &lt;p&gt;{state.error}&lt;/p&gt;}
    &lt;/form&gt;
  );
}
        </pre>
      </div>`
    },
    {
      id: 2,
      title: 'Express REST API Design & Security Notes',
      subject: 'Backend Engineering',
      description: 'Comprehensive study notes on Express routing setup, JWT session setups, CORS configuration, and security middlewares (Helmet).',
      pages: '12 pages',
      fileSize: '3.4 MB',
      icon: Server,
      detailedContent: `<div class="page cover-page">
        <div class="header-info">SKILLCRAFT ACADEMY PRESS</div>
        <h1 class="cover-title">EXPRESS API SECURITY</h1>
        <div class="cover-subtitle">ENTERPRISE REST API DESIGN & HARDENING WORKBOOK</div>
        <p style="color: #64748b; font-size: 14px; max-width: 500px; margin: 0 auto;">In-depth backend engineering revision notes on production routing, JWT setups, token rotation, rate limits, Helmet, and error pipelines.</p>
        <div class="footer-watermark" style="margin-top: 100px;">Verified study resource. Author: Deepak Shroti</div>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 2: Enterprise Controller-Service-Repository Architecture</h1>
        <p>A decoupled codebase ensures high testability. We divide routing, validation logic, controllers, and services into strict execution domains.</p>
        <pre>
// Directory layout structure:
src/
├── config/             # DB & Env variables configuration
├── controllers/        # Parses express inputs and returns HTTP payload
├── services/           # Contains core business rules
├── repositories/       # Handles database SQL queries (Prisma/TypeORM)
└── middlewares/        # Security, validation, and logs
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 3: Express Routing Pipelines & Error Wrappers</h1>
        <p>Avoid wrapping controllers manually in try/catch statements. Use custom wrapper classes to intercept errors cleanly.</p>
        <pre>
// catchAsync wrapper function:
export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Usage inside routes:
router.post('/register', catchAsync(authController.register));
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 4: Secure JWT Storage & Cookie Configurations</h1>
        <p>Never save Access Tokens inside localStorage or sessionStorage since they are accessible by malicious JavaScript scripts during Cross-Site Scripting (XSS) attacks.</p>
        <div class="alert alert-warning">
          <strong>Warning:</strong> Always send Refresh Tokens inside HttpOnly, Secure, and SameSite=Strict cookies to protect authentication credentials.
        </div>
        <pre>
res.cookie('refreshToken', token, {
  httpOnly: true, // Invisible to document.cookie API
  secure: true,   // Sent only over encrypted HTTPS
  sameSite: 'strict', // Blocks CSRF requests
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 Days
});
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 5: Refresh Token Rotation & Hijack Detection</h1>
        <p>Implement token rotation to audit hijacked sessions. Whenever a client issues a refresh token, generate a brand new token pair and invalidate the old ones.</p>
        <pre>
// Token Rotation Logic workflow:
1. Client requests token rotation using old RefreshToken.
2. Server checks database refresh token whitelist.
3. If token exists but has been used, alert security (hijack warning) and clear active sessions.
4. If valid, generate new Access/Refresh pair and save to database cache.
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 6: CORS Whitelisting Configurations</h1>
        <p>Cross-Origin Resource Sharing must be locked down to specific client domains. Do not use wildcards (<code>*</code>) in production systems.</p>
        <pre>
import cors from 'cors';

const corsOptions = {
  origin: ['https://app.skillcraft.com', 'https://admin.skillcraft.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow receiving cookies
};

app.use(cors(corsOptions));
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 7: API Rate Limiting & Protection</h1>
        <p>Defend backend instances from DDoS attempts and brute-force routing tasks using request limits.</p>
        <pre>
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 100, // Max 100 calls per window
  message: 'Too many requests from this IP. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/', apiLimiter);
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 8: Helmet and HTTP Headers Hardening</h1>
        <p>Helmet shields backends from common web vulnerabilities by configuring HTTP headers correctly.</p>
        <pre>
import helmet from 'helmet';

app.use(helmet());
// Configures headers like:
// - X-Frame-Options: DENY (Prevents clickjacking)
// - X-Content-Type-Options: nosniff (Prevents MIME sniffing)
// - Content-Security-Policy (Restricts asset load domains)
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 9: Strict Input Validation using Zod</h1>
        <p>Sanitize data payloads before execution to prevent SQL Injection and NoSQL Injection payloads.</p>
        <pre>
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email('Invalid email domain format'),
  password: z.string().min(8, 'Password must exceed 8 characters'),
  age: z.number().min(18).max(99)
});

// Middleware validate handler:
export const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }
  next();
};
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 10: Global Error Interceptor Pipeline</h1>
        <p>Never expose database errors or core stack traces directly to API consumers in production environments.</p>
        <pre>
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({
      status: 'error',
      message: err.message,
      stack: err.stack
    });
  } else {
    // Production Mode: Send clean payloads
    res.status(statusCode).json({
      status: 'fail',
      message: statusCode === 500 ? 'Internal Server Exception' : err.message
    });
  }
});
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 11: Morgan & Winston Logger Architectures</h1>
        <p>Integrate a professional logging service to write exception metrics into rolling log files.</p>
        <pre>
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 12: Production Security Checklist</h1>
        <table class="table-grid">
          <thead>
            <tr>
              <th>Security Measure</th>
              <th>Status Target</th>
              <th>Verified Tool</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>HTTPS Protocol</td>
              <td>TLS 1.3 settings enforced.</td>
              <td>Let's Encrypt</td>
            </tr>
            <tr>
              <td>SQL Parameterization</td>
              <td>No raw dynamic SQL strings.</td>
              <td>Prisma ORM</td>
            </tr>
            <tr>
              <td>Security Scanning</td>
              <td>Scan npm dependency vulnerabilities.</td>
              <td>npm audit</td>
            </tr>
          </tbody>
        </table>
      </div>`
    },
    {
      id: 3,
      title: 'Full-Stack Deployment & CI/CD Pipeline',
      subject: 'Cloud & DevOps',
      description: 'Detailed instructions on deploying MERN apps, setting up Nginx reverse proxy, configuring SSL certifications, and GitHub Actions setups.',
      pages: '8 pages',
      fileSize: '2.1 MB',
      icon: FileText,
      detailedContent: `<div class="page cover-page">
        <div class="header-info">SKILLCRAFT ACADEMY PRESS</div>
        <h1 class="cover-title">CLOUDOPS & PIPELINES</h1>
        <div class="cover-subtitle">FULL-STACK DEPLOYMENT & CI/CD ORCHESTRATION HANDBOOK</div>
        <p style="color: #64748b; font-size: 14px; max-width: 500px; margin: 0 auto;">DevOps revision reference covering daemon processes, Nginx mapping, SSL certificates, GitHub actions workflows, and Docker Compose configurations.</p>
        <div class="footer-watermark" style="margin-top: 100px;">Verified study resource. Author: Himanshu Kumar</div>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 2: PM2 cluster and processes daemon</h1>
        <p>PM2 executes Node processes as daemons, automatically rebooting them if exceptions crash instances. It can run in cluster mode to load-balance requests across multiple CPU cores.</p>
        <pre>
# Start app in cluster mode using all cores:
pm2 start app.js -i max --name "skillcraft-api"

# Manage process lists:
pm2 list
pm2 logs skillcraft-api
pm2 save # Save active process list for system reboot
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 3: Nginx Reverse Proxy Setup</h1>
        <p>Nginx acts as a web traffic entry point, mapping client requests to Node.js instances safely.</p>
        <pre>
# Location: /etc/nginx/sites-available/default
server {
    listen 80;
    server_name api.skillcraft.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 4: SSL Certificates renewal routines</h1>
        <p>Secure web domains using Let's Encrypt automated Certbot client utilities.</p>
        <pre>
# Install certbot:
sudo apt install certbot python3-certbot-nginx

# Request and apply certificates:
sudo certbot --nginx -d api.skillcraft.com

# Verify renewal dry-run configurations:
sudo certbot renew --dry-run
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 5: GitHub Actions CI/CD Pipeline yaml</h1>
        <p>Define automated workflows inside <code>.github/workflows/deploy.yml</code> to run tests, build assets, and deploy to staging/production on every push.</p>
        <pre>
name: Deploy MERN Stack
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies & run tests
        run: |
          npm ci
          npm test
        # Add automated server deployment steps
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 6: Multi-Container Docker Compose setups</h1>
        <p>Orchestrate client frameworks, backend environments, and database engines within Docker networks.</p>
        <pre>
# docker-compose.yml configuration:
version: '3.8'
services:
  api:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://db:27017/skillcraft
    depends_on:
      - db
  db:
    image: mongo:latest
    ports:
      - "27017:27017"
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 7: Server Firewall Configuration (UFW)</h1>
        <p>Close raw access ports to your databases (e.g., Mongo port 27017, Postgres port 5432) to block external exploits.</p>
        <pre>
# Configure firewall:
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 8: DevOps Production Monitoring</h1>
        <p>Track server health, CPU limits, and memory usage using standard Unix logs and uptime alerts.</p>
        <table class="table-grid">
          <thead>
            <tr>
              <th>Monitoring Metric</th>
              <th>CLI Audit Tool</th>
              <th>Limit Target</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CPU Usage</td>
              <td><code>top</code> or <code>htop</code></td>
              <td>Under 70% avg load.</td>
            </tr>
            <tr>
              <td>Disk Space</td>
              <td><code>df -h</code></td>
              <td>Under 85% disk usage.</td>
            </tr>
            <tr>
              <td>Active Socket Links</td>
              <td><code>netstat -tuln</code></td>
              <td>Audit open ports only.</td>
            </tr>
          </tbody>
        </table>
      </div>`
    },
    {
      id: 4,
      title: 'Data Science & Generative AI Blueprint',
      subject: 'Data Science & AI',
      description: 'Revision sheet on Python pandas, machine learning lifecycle, neural network parameters, and OpenAI API usage.',
      pages: '5 pages',
      fileSize: '1.8 MB',
      icon: FileCode,
      detailedContent: `<div class="page cover-page">
        <div class="header-info">SKILLCRAFT ACADEMY PRESS</div>
        <h1 class="cover-title">DATA SCIENCE & AI</h1>
        <div class="cover-subtitle">INTELLIGENT SYSTEMS & ML MODELING BLUEPRINT</div>
        <p style="color: #64748b; font-size: 14px; max-width: 500px; margin: 0 auto;">Revision guide on Pandas syntax, classification matrices, neural parameters, LLMs configuration, and guardrails.</p>
        <div class="footer-watermark" style="margin-top: 100px;">Verified study resource. Author: Feyaz Kumar</div>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 2: Pandas Data Wrangling & Cleanups</h1>
        <p>Pandas is standard for structured datasets. Clean datasets and handle missing values before model training.</p>
        <pre>
import pandas as pd

# Load dataset:
df = pd.read_csv('students.csv')

# Handle missing data structures:
df['age'] = df['age'].fillna(df['age'].median())

# Filter data records:
filtered_df = df[df['score'] &gt;= 85]
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 3: Scikit-learn Classifier pipelines</h1>
        <p>Build and validate classification pipelines using machine learning algorithms.</p>
        <pre>
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Split datasets:
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize classifier:
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Evaluate classification scores:
predictions = model.predict(X_test)
print(classification_report(y_test, predictions))
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 4: Generative AI prompt parameters and tokenizers</h1>
        <p>Fine-tune generative AI endpoints by managing context boundaries, system prompts, and parameters.</p>
        <pre>
import openai

response = openai.ChatCompletion.create(
  model="gpt-4",
  messages=[
    {"role": "system", "content": "You are a precise backend code compiler."},
    {"role": "user", "content": "Analyze this code structure."}
  ],
  temperature=0.2, // Lower value = more deterministic
  max_tokens=250
)
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 5: AI Ethics & Safety Controls</h1>
        <p>Enforce strict input validations to block prompt injection attacks and verify outputs to detect hallucinations.</p>
        <table class="table-grid">
          <thead>
            <tr>
              <th>Vulnerability Domain</th>
              <th>Attack Vector</th>
              <th>Guardrail Protocol</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Prompt Injection</td>
              <td>User attempts to override system instructions.</td>
              <td>Input sanitization & system role priorities.</td>
            </tr>
            <tr>
              <td>Hallucination</td>
              <td>Model generates fake references.</td>
              <td>Retrieval Augmented Generation (RAG).</td>
            </tr>
            <tr>
              <td>PII Leakage</td>
              <td>Model leaks private info.</td>
              <td>PII scrubbing filters (Presidio).</td>
            </tr>
          </tbody>
        </table>
      </div>`
    },
    {
      id: 5,
      title: 'Database Optimization & Indexing Strategies',
      subject: 'Database Systems',
      description: 'Guide to write high-performance SQL queries, index structures (B-Tree, Hash), partitioning database tables, and connection pools.',
      pages: '6 pages',
      fileSize: '2.5 MB',
      icon: Server,
      detailedContent: `<div class="page cover-page">
        <div class="header-info">SKILLCRAFT ACADEMY PRESS</div>
        <h1 class="cover-title">DATABASE TUNING</h1>
        <div class="cover-subtitle">ENTERPRISE DATABASE TUNING & INDEXING BLUEPRINT</div>
        <p style="color: #64748b; font-size: 14px; max-width: 500px; margin: 0 auto;"> Tightly focused index reference sheet on B-Tree/Hash indexes, EXPLAIN ANALYZE tuning, partition strategies, and pools config.</p>
        <div class="footer-watermark" style="margin-top: 100px;">Verified study resource. Author: Vrinda Gupta</div>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 2: SQL Index Structures</h1>
        <p>Understanding index types is critical for optimizing lookups. We compare B-Tree, Hash, and GIN indexes in PostgreSQL.</p>
        <table class="table-grid">
          <thead>
            <tr>
              <th>Index Type</th>
              <th>Lookup Operator</th>
              <th>Ideal Column DataType</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>B-Tree (Default)</td>
              <td><code>&lt;, &lt;=, =, &gt;=, &gt;</code></td>
              <td>Integers, Dates, Text.</td>
            </tr>
            <tr>
              <td>Hash</td>
              <td><code>=</code></td>
              <td>Exact match UUID strings.</td>
            </tr>
            <tr>
              <td>GIN (Inverted)</td>
              <td><code>@&gt;, &lt;@</code></td>
              <td>JSONB payload documents.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 3: Query Profiling (EXPLAIN ANALYZE)</h1>
        <p>Use execution plan analytics to check how database engines process queries under the hood.</p>
        <pre>
-- Run analysis on slow query:
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE customer_id = 98254
AND order_date &gt;= '2026-01-01';

-- Plan elements to watch:
1. Sequential Scans (Seq Scan): Slow table-wide reads. Create an index!
2. Index Scans: Fast index lookups.
3. Actual Loop Time: Real-time milliseconds spent.
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 4: Horizontal partitioning models</h1>
        <p>Partitioning split tables into smaller sub-tables based on a partition key (Range, List, Hash), accelerating query performance on large datasets.</p>
        <pre>
-- Create parent partitioned table:
CREATE TABLE logs (
    id SERIAL,
    log_date DATE NOT NULL,
    message TEXT
) PARTITION BY RANGE (log_date);

-- Create sub-partition for a specific range:
CREATE TABLE logs_2026_q1 PARTITION OF logs
    FOR VALUES FROM ('2026-01-01') TO ('2026-04-01');
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 5: Connection pools pgBouncer parameters</h1>
        <p>Connection creation in relational databases is expensive. PgBouncer manages database connection pooling, reducing memory usage on the database server.</p>
        <pre>
# pgbouncer.ini configuration options:
[pgbouncer]
listen_port = 6432
auth_type = md5
pool_mode = transaction # Modes: session, transaction, statement
max_client_conn = 1000
default_pool_size = 20
        </pre>
      </div>
      <div style="page-break-after: always;"></div>

      <div class="page">
        <h1>Page 6: Database Vacuum and stats monitoring</h1>
        <p>Dead rows are created during UPDATE and DELETE queries in MVCC architectures. Run database maintenance routines regularly to reclaim disk space.</p>
        <pre>
-- Reclaim space and update query planner stats:
VACUUM ANALYZE orders;

-- Check table bloat ratios:
SELECT relname, n_dead_tup, n_live_tup
FROM pg_stat_user_tables;
        </pre>
      </div>`
    }
  ];

  // Digital Notepad State
  const [customNotes, setCustomNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Load custom notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('skillcraft_custom_notes');
    if (saved) {
      setCustomNotes(JSON.parse(saved));
    }
  }, []);

  // Save custom notes to localStorage
  const saveNotesToStorage = (updated) => {
    setCustomNotes(updated);
    localStorage.setItem('skillcraft_custom_notes', JSON.stringify(updated));
  };

  // Close toast automatically after timeout
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  // Add custom notepad entry
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;

    const newNote = {
      id: Date.now(),
      title: noteTitle,
      category: 'My Notes',
      content: noteContent,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };

    const updated = [newNote, ...customNotes];
    saveNotesToStorage(updated);
    triggerToast('Note Saved to List! 📝');

    // Reset input fields
    setNoteTitle('');
    setNoteContent('');
  };

  // Delete custom note
  const handleDeleteNote = (id) => {
    const updated = customNotes.filter((n) => n.id !== id);
    saveNotesToStorage(updated);
    triggerToast('Note Deleted! 🗑️');
  };

  // Save preconfigured study guide directly into notepad
  const handleSaveToNotepad = (guide) => {
    const newNote = {
      id: Date.now(),
      title: guide.title,
      category: 'My Notes',
      content: `${guide.description}\n\nREVISION GUIDE DETAILS:\n` + guide.detailedContent.replace(/<[^>]*>/g, '\n').replace(/\n\s*\n/g, '\n'),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };
    const updated = [newNote, ...customNotes];
    saveNotesToStorage(updated);
    triggerToast('Note Saved Successfully! 💾');
  };

  // Export all saved notes to a single TXT backup file
  const handleExportAll = () => {
    const text = customNotes.map(note => (
      `=== ${note.title} (${note.date}) ===\n${note.content}\n\n`
    )).join('========================================\n\n');

    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `all_my_saved_notes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Download study guide as PDF (via Browser Native Print)
  const handleDownloadPDF = (notes) => {
    const printWindow = window.open('', '_blank', 'width=1000,height=750');
    if (!printWindow) {
      alert('Pop-up blocked! Please allow pop-ups to download study guides.');
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>${notes.title}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;750;900&family=Fira+Code:wght@400;650&display=swap');
            
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              color: #0f172a;
              line-height: 1.6;
              padding: 45px;
              max-width: 850px;
              margin: 0 auto;
              background: #ffffff;
            }
            .page {
              margin-bottom: 30px;
            }
            .cover-page {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 85vh;
              text-align: center;
              border: 3px double #e2e8f0;
              padding: 40px;
              border-radius: 20px;
            }
            .cover-title {
              font-size: 36px;
              font-weight: 900;
              color: #1e3a8a;
              margin-top: 20px;
              margin-bottom: 10px;
              letter-spacing: -0.025em;
              text-transform: uppercase;
            }
            .cover-subtitle {
              font-size: 16px;
              color: #f26e56;
              font-weight: 700;
              letter-spacing: 2px;
              text-transform: uppercase;
              margin-bottom: 40px;
            }
            h1, h2, h3 {
              color: #1e3a8a;
              font-weight: 800;
            }
            h1 {
              font-size: 24px;
              border-bottom: 2px solid #f26e56;
              padding-bottom: 8px;
              margin-top: 0;
            }
            h2 {
              font-size: 18px;
              margin-top: 25px;
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 6px;
            }
            p {
              font-size: 13.5px;
              color: #334155;
            }
            pre {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-left: 4px solid #f26e56;
              padding: 16px;
              border-radius: 12px;
              font-family: 'Fira Code', monospace;
              font-size: 12px;
              line-height: 1.5;
              overflow-x: auto;
              margin: 18px 0;
            }
            code {
              font-family: 'Fira Code', monospace;
              background: #f1f5f9;
              padding: 2px 5px;
              border-radius: 4px;
              font-size: 12px;
              color: #0f172a;
            }
            .alert {
              background: #eff6ff;
              border-left: 4px solid #2563eb;
              padding: 15px;
              border-radius: 8px;
              margin: 18px 0;
              font-size: 13px;
              color: #1e3a8a;
            }
            .alert-warning {
              background: #fffbeb;
              border-left: 4px solid #d97706;
              color: #78350f;
            }
            .table-grid {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              font-size: 12.5px;
            }
            .table-grid th, .table-grid td {
              border: 1px solid #e2e8f0;
              padding: 10px;
              text-align: left;
            }
            .table-grid th {
              background: #f8fafc;
              font-weight: bold;
              color: #1e293b;
            }
            .header-info {
              font-size: 10px;
              color: #64748b;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              margin-bottom: 20px;
            }
            .footer-watermark {
              margin-top: 40px;
              border-top: 1px solid #e2e8f0;
              padding-top: 15px;
              text-align: center;
              font-size: 11px;
              color: #94a3b8;
            }
          </style>
        </head>
        <body>
          ${notes.detailedContent}
          <div class="footer-watermark">Verified study notes supplied by SkillCraft. Save or print as PDF.</div>
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Download custom note as TXT file
  const handleDownloadTXT = (note) => {
    const element = document.createElement("a");
    const file = new Blob([
      `=== SKILLCRAFT PERSONAL NOTE ===\n`,
      `TITLE: ${note.title}\n`,
      `TOPIC: ${note.category}\n`,
      `DATE: ${note.date}\n`,
      `==============================\n\n`,
      `${note.content}`
    ], { type: 'text/plain' });

    element.href = URL.createObjectURL(file);
    element.download = `${note.title.replace(/\s+/g, '_')}_notes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Print/PDF Custom Note
  const handlePrintCustomNote = (note) => {
    const printWindow = window.open('', '_blank', 'width=900,height=750');
    if (!printWindow) {
      alert('Pop-up blocked! Please allow pop-ups to print notes.');
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>${note.title}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;750;900&display=swap');
            
            body {
              font-family: 'Inter', sans-serif;
              color: #0f172a;
              line-height: 1.6;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header-label {
              font-size: 10px;
              color: #f26e56;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              margin-bottom: 5px;
            }
            h1 {
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 10px;
              margin-top: 5px;
              font-size: 24px;
              color: #1e3a8a;
            }
            .meta {
              font-size: 12px;
              color: #64748b;
              margin-bottom: 30px;
            }
            .content {
              font-size: 14px;
              white-space: pre-wrap;
              color: #334155;
            }
            .footer-info {
              margin-top: 60px;
              text-align: center;
              font-size: 11px;
              color: #94a3b8;
              border-top: 1px dashed #cbd5e1;
              padding-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="header-label">Personal Learning Notebook</div>
          <h1>${note.title}</h1>
          <div class="meta">Topic: ${note.category} | Created on ${note.date}</div>
          <div class="content">${note.content}</div>
          <div class="footer-info">Generated via SkillCraft Interactive Notebook. Print or save as PDF.</div>
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // No categories filter

  return (
    <div className="bg-slate-50 dark:bg-[#070b13] text-slate-905 dark:text-slate-100 min-h-screen py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Glowing Page Header */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-205 dark:border-slate-805/70 shadow-lg mb-10 p-6 md:p-8 bg-gradient-to-r from-primary-500/10 via-purple-500/5 to-transparent dark:from-primary-950/20 dark:via-purple-950/10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#f26e56]/20 bg-[#f26e56]/5 text-[#f26e56] text-[10px] font-extrabold uppercase tracking-widest mb-3 animate-pulse">
                <Sparkles className="h-3.5 w-3.5" /> Revision Portal
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-905 dark:text-white leading-none">
                Interactive Notebook & Guides
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Write your own learning summaries, save them locally, and download verified PDF study materials.
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-205 dark:border-slate-800 px-5 py-3 rounded-2xl text-center shadow-sm">
                <span className="block text-xl font-black text-slate-900 dark:text-white">{customNotes.length}</span>
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-505 uppercase tracking-widest">My Notes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805/70 rounded-3xl p-5 mb-10 flex items-start gap-4 shadow-sm">
          <ShieldCheck className="h-6 w-6 text-[#f26e56] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Verified Premium Resources</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-semibold">
              These notes are regularly reviewed by instructors to match the latest industry updates. Feel free to use them for interview revisions and practical projects.
            </p>
          </div>
        </div>

        {/* Two Column Layout: Guides & Notepad */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE: PRE-CONFIGURED LECTURE NOTES (Lg-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#f26e56]" /> Faculty Study Guides (PDF)
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {notesList.map((notes) => {
                const Icon = notes.icon;
                return (
                  <div key={notes.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-805/70 shadow-sm hover:shadow-md transition-shadow flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-[#f26e56] border border-slate-100 dark:border-slate-800 flex-shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#f26e56] mb-1">
                        {notes.subject}
                      </span>
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base mb-1.5 leading-tight">
                        {notes.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-semibold">
                        {notes.description}
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-805/65 flex justify-between items-center text-xs text-slate-455 font-bold uppercase">
                        <span>{notes.pages} • {notes.fileSize}</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleSaveToNotepad(notes)}
                            className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750 rounded-xl font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer text-[10px]"
                          >
                            Save Note
                          </button>
                          <button 
                            onClick={() => handleDownloadPDF(notes)}
                            className="px-4 py-2 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white rounded-xl font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow active:scale-95 text-[10px]"
                          >
                            <Download className="h-3.5 w-3.5" /> PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: DIGITAL NOTEPAD (Lg-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-[#f26e56]" /> Live Digital Notepad
            </h2>

            {/* Note taking form */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-205 dark:border-slate-805/70 shadow-md">
              <form onSubmit={handleAddNote} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-355 uppercase mb-1.5">Note Title</label>
                  <input 
                    type="text" 
                    required
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    placeholder="e.g., Hooks optimization logic"
                    className="block w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-semibold shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-355 uppercase mb-1.5">Note Content</label>
                  <textarea 
                    required
                    rows={4}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Type your lecture summary or revision keys here..."
                    className="block w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-semibold shadow-sm resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white rounded-xl text-xs font-extrabold uppercase tracking-wide flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:scale-101 active:scale-95 transition-all"
                >
                  <Plus className="h-4 w-4" /> Save Note as My Notes
                </button>
              </form>
            </div>

            {/* Saved notepad entries display list */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mt-6">
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-355 uppercase tracking-widest">My Saved Notepad Entries</h3>
                {customNotes.length > 0 && (
                  <button 
                    onClick={handleExportAll}
                    className="text-[10px] font-black uppercase tracking-wider text-[#f26e56] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <FileDown className="h-3.5 w-3.5" /> Save All Notes (.txt)
                  </button>
                )}
              </div>

              {customNotes.length === 0 ? (
                <div className="text-center py-10 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-805/70 rounded-3xl shadow-sm text-slate-455 dark:text-slate-500 text-xs font-semibold">
                  No notes saved yet. Write something in the pad above!
                </div>
              ) : (
                <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
                  {customNotes.map((note) => (
                    <div key={note.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-805/70 shadow-sm relative group/saved">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div>
                          <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mt-1.5 leading-snug">
                            {note.title}
                          </h4>
                          <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{note.date}</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteNote(note.id)}
                          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                          title="Delete Note"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed font-semibold line-clamp-3 whitespace-pre-wrap">
                        {note.content}
                      </p>

                      {/* Download Actions */}
                      <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-805/65">
                        <button 
                          onClick={() => handleDownloadTXT(note)}
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors border border-slate-100 dark:border-slate-800"
                        >
                          <FileDown className="h-3.5 w-3.5" /> TXT
                        </button>
                        <button 
                          onClick={() => handlePrintCustomNote(note)}
                          className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-[#f26e56] rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors border border-slate-100 dark:border-slate-800"
                        >
                          <Printer className="h-3.5 w-3.5" /> Print/PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      {/* Dynamic Toast Notification (Right Bottom of Window) */}
      <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/20 font-sans transition-all duration-500 transform ${
        showToast ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
      }`}>
        <Sparkles className="h-4 w-4 animate-bounce" strokeWidth={3} />
        <span className="text-xs font-black uppercase tracking-wider">{toastMessage}</span>
      </div>

      </div>
    </div>
  );
};

export default Notes;

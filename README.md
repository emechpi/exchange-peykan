## Peykan Exchange project - frontEnd challange - Milad Hosseinpour

### 🚀 Quick Start:

Install all required dependencies by running

```
pnpm install | yarn install | npm install
```

Once the package installation is complete, synchronize the database with the Prisma schema and generate the Prisma Client in the node modules folder by running the command

```
pnpm prisma migrate dev
```

Build and serve the application by starting the Next.js development server with the command

```
pnpm dev
```

### Topics Covered

- Running the Next.js 13 JWT API Project Locally
- Setup the Next.js Project
- Setup Prisma in the Next.js Project
  - Define the Database Model and Run Migrations
  - Instantiate the Prisma Client
- Create the Request Validation Schemas
- Create Some Utility Functions
  - Function to Get an Environment Variable
  - Function to Return a Next.js API Response
- Function to Return a Next.js API Response
  - Sign the JWT using HS256 Algorithm
  - Create a Function to Verify the JWT
- Create a Next.js Middleware to Protect Routes
- Create API Route Handlers to Handle the JWT Authentication
  - Account Registration API Route Handler
  - Account Login API Route Handler
  - Account Logout API Route Handler
  - Fetch Authenticated User Route Handler
- Test the JWT Authentication
  - Register an Account
  - Sign in to your Account
  - Get your Account Credentials
  - Logout from your Account

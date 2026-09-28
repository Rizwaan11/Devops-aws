# Minimal Express app for AWS EC2

A small beginner-friendly application for practicing deployment to an Ubuntu EC2 instance.

## Run locally

Install Node.js 20 or later, then run:

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The health check is at <http://localhost:3000/health>.

For a normal (non-watch) process, use `npm start`. Set a different port when needed:

```bash
PORT=8080 npm start
```

In PowerShell, use `$env:PORT=8080; npm start` instead.

## Deploy to an Ubuntu EC2 instance

These steps assume you already created an Ubuntu EC2 instance, can connect to it with SSH, and have copied or cloned this project onto it. They do not require AWS credentials inside the app.

1. Connect to the instance:

   ```bash
   ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
   ```

2. Install Node.js 20 or later. For example, install `nvm`, then install the current LTS release by following the instructions at <https://github.com/nvm-sh/nvm>:

   ```bash
   nvm install --lts
   node --version
   npm --version
   ```

3. Enter the directory where you placed the project, install production dependencies, and try the app:

   ```bash
   cd path/to/project
   npm install --omit=dev
   npm start
   ```

4. In the EC2 security group, add an inbound TCP rule for port `3000`. For learning, restrict the source to **My IP** whenever possible. Then visit `http://YOUR_EC2_PUBLIC_IP:3000`.

5. Keep the app running with PM2:

   ```bash
   npm install --global pm2
   pm2 start server.js --name devweek-express
   pm2 save
   pm2 startup
   ```

   Run the command printed by `pm2 startup`, then run `pm2 save` once more. Useful commands are `pm2 status`, `pm2 logs devweek-express`, and `pm2 restart devweek-express`.

For a real public service, put a reverse proxy such as Nginx in front of the app, expose only ports 80/443 publicly, and keep port 3000 private. That is intentionally outside this minimal exercise.

## Routes

- `GET /` returns a welcome message.
- `GET /health` returns `{ "status": "ok" }`.

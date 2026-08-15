module.exports = {
  apps: [
    {
      name: "morya-web",
      script: "npm",
      args: "start",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: "3001",
      },
    },
  ],
};

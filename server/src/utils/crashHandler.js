process.on("uncaughtException", err => {
  console.log(`[FATAL] [PROCESS] uncaught exception, shutting down...`);
  console.log(err.message);
  process.exit(1);
});

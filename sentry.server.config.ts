// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://3ec5c16c1d7e1ceaab03b457a03c5051@o4511101052387328.ingest.us.sentry.io/4511101063987200",

  integrations:[
     Sentry.consoleLoggingIntegration({
        levels : ["log" , "warn" , "error" ]
     }),
  ],
  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

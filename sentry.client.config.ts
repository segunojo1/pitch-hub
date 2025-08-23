import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://c92cca071879b82b032ce1d90fe3b3e9@o4509890783150080.ingest.de.sentry.io/4509890787278928",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
});
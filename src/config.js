module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://Malek@localhost/noteful-api",
  TEST_DATABASE_URL: process.env.DATABASE_URL || "postgresql://Malek@localhost/noteful-api"
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ACCESS_SECRET: string;
      REFRESH_SECRET: string;
      DATABASE_URL: string;
    }
  }
}

export {};

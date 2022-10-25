declare namespace NodeJS {
  interface ProcessEnv {
    readonly JWT_REFRESH_SECRET: string
    readonly JWT_ACCESS_SECRET: string
  }
}
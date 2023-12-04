declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    GITHUB_ID: string
    GITHUB_SECRET: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    NEXT_PUBLIC_BASE_URL: string
  }
}

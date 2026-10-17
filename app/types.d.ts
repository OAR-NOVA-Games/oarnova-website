declare module '#app' {
  interface PageMeta {
    /** Set on the catch-all route; the language switch then targets the other home page. */
    notFound?: boolean
  }
}

export {}

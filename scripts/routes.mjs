// Locale-neutral public routes (trailing slash). Persian twins live under /fa.
// Kept in sync with app/content/games.ts by tests/unit/routes.test.ts.
export const siteUrl = 'https://oarnova.games'
export const gameSlugs = ['dooma', 'chista', 'yarizan']
export const siteRoutes = ['/', '/games/', ...gameSlugs.map((s) => `/games/${s}/`), '/about/', '/contact/']
export const allRoutes = [...siteRoutes, ...siteRoutes.map((p) => `/fa${p}`)]

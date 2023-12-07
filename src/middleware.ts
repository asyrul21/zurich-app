// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export { default } from "next-auth/middleware";
// import { withAuth } from "next-auth/middleware";

/**
 * NextAuth middleware does not work: https://github.com/nextauthjs/next-auth/issues/5008
 * https://github.com/nextauthjs/next-auth/issues/5096
 */

// export default withAuth(function middleware() {});

// export const config = { matcher: ["/users"] };

export default () => {};

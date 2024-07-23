/**
 * Routes which are public and does not required authentication
 * @type {string[]}
 */

export const publicRoutes = ["/"];

// routes which requires authentication
/**
 *  API authentication routes
 * These routes requires authentication
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register"];

/**
 * Prefix used for api authencation
 * Routes which includes this prefix, need not be protected.
 * @type {string}
 */
export const apiAuthPrefix = "/api";

/**
 * Default Login redirect upon successfull signin.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/your-work";

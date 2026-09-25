import { expect } from "@playwright/test";
import { prototypeFixtureFile, readJSON } from "./common.mjs";
import { settle } from "./dom.mjs";

export const prototype = () => readJSON(prototypeFixtureFile);

/** Open a site route; fail the test clearly when the page does not exist. */
export async function openSite(page, { name, route }) {
  const res = await page.goto(route, { waitUntil: "load" });
  expect(res?.status(), `"${name}" page is missing: ${route} returned ${res?.status()} (prototype page "${name}" has no route on the site)`).toBe(200);
  await settle(page);
  return res;
}

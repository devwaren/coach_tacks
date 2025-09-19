// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.
import { html, useTSElements } from "@devwareng/vanilla-ts"

import NotFound from "../pages/404/NotFound";
import AboutJohn from "../pages/Home/AboutJohn";
import Classes from "../pages/Home/Classes";
import Hero from "../pages/Home/Hero";
import Index from "../pages/Home/index";
import Testimonials from "../pages/Home/Testimonials";
import Index from "../pages/index";

export function NotFound(DOM: HTMLElement) {
  return useTSElements(DOM, html`<div class="animate__animated animate__fadeIn duration-300 p-4"><h1>404 - Page Not Found</h1></div>`)
}

export function RootDocument(DOM: HTMLElement) {
  return useTSElements(DOM, html`<div><h1>Root</h1></div>`)
}

export const routeTree = [
  { path: "/404/NotFound", name: "404-NotFound", component: (DOM: HTMLElement) => NotFound(DOM) },
  { path: "/Home/AboutJohn", name: "Home-AboutJohn", component: (DOM: HTMLElement) => AboutJohn(DOM) },
  { path: "/Home/Classes", name: "Home-Classes", component: (DOM: HTMLElement) => Classes(DOM) },
  { path: "/Home/Hero", name: "Home-Hero", component: (DOM: HTMLElement) => Hero(DOM) },
  { path: "/Home", name: "Home", component: (DOM: HTMLElement) => Index(DOM) },
  { path: "/Home/Testimonials", name: "Home-Testimonials", component: (DOM: HTMLElement) => Testimonials(DOM) },
  { path: "/", name: "index", component: (DOM: HTMLElement) => Index(DOM) }
]

export function createRouter(DOM: HTMLElement) {
  function matchRoute(path: string) {
    for (const route of routeTree) {
      const keys: string[] = []
      const regex = new RegExp("^" + route.path.replace(/:([^/]+)/g, (_, key) => {
        keys.push(key)
        return "([^/]+)"
      }) + "$")
      const pathname = path.split("?")[0]
      const match = pathname.match(regex)
      if (match) {
        const params: Record<string, string> = {}
        keys.forEach((key, i) => (params[key] = match[i + 1]))
        return { ...route, params }
      }
    }
    return null
  }

  function navigate(path: string) {
    const match = matchRoute(path)
    if (match) { match.component(DOM); history.pushState({}, "", path) }
    else { NotFound(DOM) }
  }

  window.addEventListener("popstate", () => {
    const path = window.location.pathname + window.location.search
    const match = matchRoute(path)
    if (match) { match.component(DOM) }
    else { NotFound(DOM) }
  })

  navigate(window.location.pathname + window.location.search)
  return { navigate, routes: routeTree }
}

import { useTSLazy } from "@devwareng/vanilla-ts";

const Navbar = useTSLazy(
    () => import("./Navbar")
);

const BgOverlay = useTSLazy(
    () => import("./BgOverlay")
);

const Footer = useTSLazy(
    () => import("./Footer"))

export { Navbar, BgOverlay, Footer }
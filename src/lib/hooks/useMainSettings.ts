import { useTSCollection, useTSComponent } from "@devwareng/vanilla-ts"
import { Footer, Navbar } from "../components"
import { Router } from "@/routes"
import { ReturnMainComponents } from "../types/Return"

const useMainSettings = (DOM: HTMLElement, title: string): ReturnMainComponents => {

    enum IDs {
        NAVBAR = "navbar",
        ROUTER = "router",
        FOOTER = "footer"
    }

    const sections = [IDs.NAVBAR, IDs.FOOTER]

    const elements = [Navbar, Footer]

    const component = useTSComponent(IDs.ROUTER, DOM, Router, title)
    const collection = useTSCollection(sections, DOM, elements)

    return [component, collection]
}

export { useMainSettings }

type CarType = {
    make: string;
    model: string;
};

class Car implements CarType {
    make: string;
    model: string;

    constructor(make: string, model: string) {
        this.make = make;
        this.model = model;
    }
}

const myCar = new Car("Toyota", "Corolla");

myCar.make;  // "Toyota"
myCar.model; // "Corolla"
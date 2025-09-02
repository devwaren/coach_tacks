declare module "*.css" {
    const content: { [className: string]: string };
    export default content;
}

declare module "*.scss" {
    const content: { [className: string]: string };
    export default content;
}

declare module "*.sass" {
    const content: { [className: string]: string };
    export default content;
}

declare module "*.svg" {
    const content: string;
    export default content;
}

declare module "*.gif" {
    const content: string;
    export default content;
}
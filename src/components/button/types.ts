export const ButtonTypes = {
    "is-rounded": "is-rounded" as "is-rounded",
    "primary": "primary" as "primary",
    "secondary": "secondary" as "secondary",
    "basic": "basic" as "basic",
    "smooth-edges": "smooth-edges" as "smooth-edges",
    "no-background": "no-background" as "no-background",
    "only-show-development" : "only-show-development" as "only-show-development"
};
  
export type ButtonTypes = typeof ButtonTypes[keyof typeof ButtonTypes];
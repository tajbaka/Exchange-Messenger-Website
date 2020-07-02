export const InputTypes = {
    "primary": "primary" as "primary",
    "secondary": "secondary" as "secondary"
};
  
export type InputTypes = typeof InputTypes[keyof typeof InputTypes];
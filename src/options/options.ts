export interface Option {
    name: string,
    description: string,
    key: string,
    type: "text" | "checkbox",
}

export const optionsList: Option[] = [
    {
        name: "Suppress Rolls",
        description: "Do not resolve rolls made by /roll, etc",
        key: "suppressRolls",
        type: "checkbox"
    }
];
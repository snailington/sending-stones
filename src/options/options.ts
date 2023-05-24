export interface Option {
    name: string,
    description: string,
    key: string,
    type: "text" | "checkbox" | "select",
    options?: {value: string, name: string}[]
}

export const optionsList: Option[] = [
    {
        name: "Width",
        description: "Window width",
        key: "windowWidth",
        type: "select",
        options: [
            {value: "small", name: "Small"},
            {value: "medium", name: "Medium"},
            {value: "large", name: "Large"}
        ]
    },
    {
        name: "Suppress Rolls",
        description: "Do not resolve rolls made by /roll, etc. Requires a compatible dice roller extension.",
        key: "suppressRolls",
        type: "checkbox"
    }
];
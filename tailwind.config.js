module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            current: "currentColor",
            "grey-3": "#728095",
            "grey-2": "#A1AEBF",
            "grey-1": "#CCD5DF",
            "grey-0": "#F7FAFC",
            "blue-dark": "#2B6CB0",
            "blue-semidark": "#3182CE",
            "blue-cyan": "#4FD1C5",
            "blue-light": "#BEE3F8",
            "123" : "#A267AC",
            "234" : "#6867AC",
            green: "#68D391",
            black: "#151515",
            white: "#fefefe",
        },
        extend: {
            dropShadow: {
                card: "0px 9px 12px 0px rgba(0, 0, 0, 0.05)",
                input: "0px 0px 0px 2px rgba(49, 130, 206, 0.5)",
            },
            boxShadow: {
                card: "0px 9px 12px 0px rgba(0, 0, 0, 0.05)",
                input: "0px 0px 0px 2px rgba(49, 130, 206, 0.5)",
            },
        },
    },
    plugins: [],
};

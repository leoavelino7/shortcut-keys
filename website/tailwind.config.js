function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

module.exports = {
  content: ["./app/**/**.{tsx,ts,html}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": withOpacityValue("--color-primary"),
        "secondary": withOpacityValue("--color-secondary"),
      },
    },
  },
  plugins: [],
};

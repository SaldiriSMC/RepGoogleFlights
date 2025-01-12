export const dropdownStyles = (theme) => ({
    control: (base) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
      borderColor: "transparent",
      color: theme === "dark" ? "#ffffff" : "#000000",
    }),
    singleValue: (base) => ({
      ...base,
      color: theme === "dark" ? "#ffffff" : "#000000",
    }),
    input: (base) => ({
      ...base,
      color: theme === "dark" ? "#ffffff" : "#000000",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#222222" : "#ffffff",
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused
        ? theme === "dark"
          ? "#444444"
          : "#f0f0f0"
        : theme === "dark"
        ? "#222222"
        : "#ffffff",
      color: theme === "dark" ? "#ffffff" : "#000000",
    }),
  });
  
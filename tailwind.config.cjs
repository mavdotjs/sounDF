const forms = require("@tailwindcss/forms");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}", require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [forms, require('@skeletonlabs/skeleton/tailwind/theme.cjs')],
};

module.exports = config;

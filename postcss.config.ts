type PostcssConfig = {
  plugins: Record<string, Record<string, never>>;
};

const config: PostcssConfig = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;

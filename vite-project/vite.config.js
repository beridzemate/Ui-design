export default {
  esbuild: {
    loader: 'jsx', // Ensure esbuild is set to parse JSX in JS/JSX files
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Ensure Vite can resolve .jsx files
  },
};

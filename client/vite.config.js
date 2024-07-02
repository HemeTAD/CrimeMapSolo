import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';
// https://vitejs.dev/config/
dotenv.config();

// Load environment variables from .env file
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      REACT_APP_GOOGLE_MAPS_API_KEY: JSON.stringify(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    }
  }
});
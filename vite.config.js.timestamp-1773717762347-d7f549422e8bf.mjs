// vite.config.js
import { defineConfig } from "file:///D:/Frontend%20Projects/react-anime-list/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Frontend%20Projects/react-anime-list/node_modules/@vitejs/plugin-react/dist/index.js";
import tailwindcss from "file:///D:/Frontend%20Projects/react-anime-list/node_modules/@tailwindcss/vite/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 5174,
    proxy: {
      "/oauth": {
        target: "https://myanimelist.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/oauth/, "")
      },
      "/api": {
        target: "https://api.myanimelist.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxGcm9udGVuZCBQcm9qZWN0c1xcXFxyZWFjdC1hbmltZS1saXN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxGcm9udGVuZCBQcm9qZWN0c1xcXFxyZWFjdC1hbmltZS1saXN0XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Gcm9udGVuZCUyMFByb2plY3RzL3JlYWN0LWFuaW1lLWxpc3Qvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gXCJAdGFpbHdpbmRjc3Mvdml0ZVwiO1xuXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICAgIHJlYWN0KCksXG4gICAgICB0YWlsd2luZGNzcygpXG4gIF0sXG4gICAgc2VydmVyIDoge1xuICAgICAgcG9ydDogNTE3NCxcbiAgICAgICAgcHJveHk6IHtcbiAgICAgICAgICAnL29hdXRoJyA6IHtcbiAgICAgICAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly9teWFuaW1lbGlzdC5uZXQnLFxuICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9vYXV0aC8sICcnKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgICAnL2FwaScgOiB7XG4gICAgICAgICAgICAgIHRhcmdldCA6IFwiaHR0cHM6Ly9hcGkubXlhbmltZWxpc3QubmV0XCIsXG4gICAgICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlTLFNBQVMsb0JBQW9CO0FBQ3RVLE9BQU8sV0FBVztBQUNsQixPQUFPLGlCQUFpQjtBQUd4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsRUFDaEI7QUFBQSxFQUNFLFFBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNKLE9BQU87QUFBQSxNQUNMLFVBQVc7QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxZQUFZLEVBQUU7QUFBQSxNQUNsRDtBQUFBLE1BQ0UsUUFBUztBQUFBLFFBQ1AsUUFBUztBQUFBLFFBQ1AsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLE1BQ2hEO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

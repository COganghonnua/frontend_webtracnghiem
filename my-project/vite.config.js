import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

export default defineConfig({
    server: {
        https: {
            key: fs.readFileSync("./certs/localhost-key.pem"), // Đường dẫn đến private key
            cert: fs.readFileSync("./certs/localhost.pem"),    // Đường dẫn đến chứng chỉ public
        },
        port: 5173,
        hmr: {
            protocol: "wss",  // Sử dụng WebSocket an toàn
            host: "localhost", // Đảm bảo host chính xác
        },
    },
    plugins: [react()],
});

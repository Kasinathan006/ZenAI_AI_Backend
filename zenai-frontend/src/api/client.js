// src/api/client.js

import axios from "axios"

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // FastAPI backend base URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
})

// Global API response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("[API OK]", response.config.url, response.status)
    return response
  },
  (error) => {
    const url = error.config?.url || "Unknown URL"
    const status = error.response?.status || "No Status"
    const message = error.message || "Unknown Error"
    console.error(`[API ERROR] ${url} → ${status}: ${message}`)
    return Promise.reject(error)
  }
)

// Test backend connectivity
export async function testConnection() {
  try {
    const res = await api.get("/api/ping")
    console.log("✅ Backend connected:", res.data.message)
    return true
  } catch (err) {
    console.error("❌ Backend not reachable:", err.message)
    return false
  }
}

export default api

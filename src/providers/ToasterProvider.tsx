"use client"

import { Toaster } from "react-hot-toast"

export function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      toastOptions={{
        duration: 3000,
        style: {
          background: "var(--toast-bg, #333)",
          color: "var(--toast-color, #fff)",
        },
      }}
    />
  )
}

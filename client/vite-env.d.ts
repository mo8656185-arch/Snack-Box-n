/// <reference types="vite/client" />

declare global {
  interface Window {
    tiktokEmbed?: {
      lib: {
        render: () => void;
      };
    };
  }
}

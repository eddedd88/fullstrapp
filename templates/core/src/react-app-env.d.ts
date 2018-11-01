/// <reference types="react-scripts" />

// navigator.share method
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
type ShareOptions = {
  url: string
  text: string
  title: string
}

interface Navigator {
  share(options: ShareOptions): Promise
}

// Google Analytics gtag library
declare namespace NodeJS {
  interface Global {
    gtag(): void
  }
}

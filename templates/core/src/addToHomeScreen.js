export default function addToHomeScreen() {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault()
    e.prompt()
  })
}

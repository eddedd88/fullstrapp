const appName = 'material-pwa'

// log it in dev and use gtag in prod
let tracker = console.log
if (
  process.env.NODE_ENV === 'production' &&
  process.env.REACT_APP_GA_TRACKING_ID
) {
  global.gtag('js', new Date())
  global.gtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
    send_page_view: false
  })
  tracker = global.gtag
}

/**
 * Track a screen viewed event using gtag, for more info see
 * https://developers.google.com/analytics/devguides/collection/gtagjs/screens
 */
export const screenViewed = ({ screenName }: {| screenName: string |}): void =>
  tracker('event', 'screen_view', {
    app_name: appName,
    screen_name: screenName
  })

/**
 * Track an event using gtag, for more info see
 * https://developers.google.com/analytics/devguides/collection/gtagjs/events
 */
export const track = (
  eventName: string,
  parameters: { [string]: string }
): void => tracker('event', eventName, parameters)

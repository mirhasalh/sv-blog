export class AppPageState {
  requestInternalTesting = () => {
    const email = prompt('Enter your email to request access to the closed testing:')

    if (email) {
      const subject = encodeURIComponent('Request to join closed-testing')
      const body = encodeURIComponent(`Hello,\n\nI would like to join the closed testing for your app.\n\nMy email: ${email}\n\nThanks!`)
      const mailtoLink = `mailto:irhasm@icloud.com?subject=${subject}&body=${body}`

      window.location.href = mailtoLink
    }
  }
}
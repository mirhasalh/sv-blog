<script lang="ts">
  import { email, socials } from '#lib/config.ts'
  import { l10n } from '#lib/shared.svelte.ts'
  import Logo from './Logo.svelte'
  import Netlify from './logos/Netlify.svelte'

  const d = new Date()

  let { trailing } = $props(),
    year = $state(d.getFullYear()),
    emailBody = $state("Hi, let's connect.")

  const sendEmail = (event: Event) => {
    event.preventDefault()
    const subject = 'Contact form submission'
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`
    window.location.href = mailtoLink
  }
</script>

<footer class="footer bg-base-300 p-10 text-base-content md:footer-horizontal">
  <nav>
    <h3 class="merriweather footer-title">{l10n('socials')}</h3>
    {#each socials as social (social.id)}
      <a class="roboto-serif roboto link link-hover" href={social.url} target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab">
        {social.name}
      </a>
    {/each}
  </nav>
  <form onsubmit={sendEmail}>
    <h3 class="merriweather footer-title">{l10n('getInTouch')}</h3>
    <fieldset class="fieldset">
      <legend class="roboto-serif fieldset-legend">{l10n('emailMe')}</legend>
      <div class="join">
        <input class="roboto-serif input-bordered input join-item" id="email-body" name="email-body" type="text" aria-label="Email body" placeholder="Jot something down" bind:value={emailBody} />
        <button type="submit" class="btn join-item btn-primary" disabled={emailBody.length < 5}>
          <span class="roboto-serif">{l10n('uiLabel.send')}</span>
        </button>
      </div>
    </fieldset>
  </form>
  <nav>
    <h3 class="merriweather footer-title">{l10n('themes')}</h3>
    {@render trailing?.()}
  </nav>
</footer>
<footer class="footer bg-base-300 px-10 py-4 text-base-content">
  <aside>
    <a href="/" title="Home">
      <Logo />
    </a>
    <p class="roboto-serif italic">
      <span>Irhas’ blog</span>
      <br />
      © {year}
    </p>
  </aside>
  <nav class="md:place-self-center md:justify-self-end">
    <div class="grid grid-flow-col gap-4">
      <a class="btn h-20 btn-ghost" href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab">
        <Netlify />
      </a>
    </div>
  </nav>
</footer>

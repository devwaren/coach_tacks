import { html } from '@devwareng/vanilla-ts'
import Start from './App'

export async function render(_url: string) {
  const appHtml = Start()

  return {
    html: html`
      <div id="app">${appHtml}</div>
      <script type="module" src="/src/entry-client.ts"></script>
    `,
    head: `<title>My App</title>`,
  }
}

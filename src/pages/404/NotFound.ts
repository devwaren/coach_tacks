import { html, useTSElements, useTSMetaData } from '@devwareng/vanilla-ts'
import notfoundGIF from "/notfound.gif"

export default function NotFound(DOM: HTMLElement, websiteName: string) {

  document.title = websiteName + ' | 404'

  useTSMetaData({
    name: 'NotFound',
    description: '',
    author: ''
  });

  const ui = useTSElements(
    DOM,
    html`
        <div class="h-screen grid place-items-center">
          <div>
            <div class="relative">
              <img src=${notfoundGIF} loading="lazy" alt="404" />
              <div class="text-center absolute bottom-[-10%] left-0 right-0">
                <p class="text-5xl font-bold">404</p>
                <h1>Page Not Found</h1>
                <p class="text-sm text-gray-600">It looks like the page you're looking for doesn't exist.</p>
              </div>
            </div>
          </div>
        </div>
    `,
  );

  return ui
}
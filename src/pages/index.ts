import { useHomeSettings } from '@/lib/hooks';
import { html, useTSElements, useTSMetaData } from '@devwareng/vanilla-ts';

export default function Index(DOM: HTMLElement) {

  useTSMetaData({
    name: "Home Page",
    author: "John Tacker",
    description: `This is my homepage.`
  })


  const ui = useTSElements(
    DOM,
    html`
        <div class="bg-black w-full h-auto relative text-white">
          <div id="hero" class=""></div>
          <div id="about-john" class="relative"></div>
          <div id="classes" class="relative"></div>
          <div id="testimonials" class="relative"></div>
        </div>
    `
  )


  return [ui, useHomeSettings(DOM)]

}
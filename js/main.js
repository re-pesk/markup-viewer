import '../css/style.css'
import viteLogo from '../img/vite.svg'
import javascriptLogo from './img/javascript.svg'
import { setupCounter } from './counter.js'

//  import md from './the-doc.md' assert { type: 'text' }


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
    <p><div id="json"></div></p>
  </div>
`
setupCounter(document.querySelector('#counter'))

const { json } = await import('../test.json')
document.querySelector('#json').innerHTML += `${JSON.stringify(json)}`

const md = (await import('@virtual:plain-text/the-doc.md')).plainText
document.querySelector('#md').innerHTML = `<pre>${md}</pre>`

// console.log(window.location.search.slice(1));


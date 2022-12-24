import '/css/style.css';
import Vite from '/img/vite.svg';
import JS from '/img/javascript.svg';
import { setupCounter } from './counter.js';
import { attributes, html, toc } from '/content/md-test.md';
import { json } from '/content/test.json';

document.querySelector('#aside').innerHTML = `
  <div id="toc">
    <img src="${Vite}"/>  <img src="${JS}"/>

    <h1>Contents</h1>
    <div id="toc-inner">
      <p><div id="links"></div></p>
      <p><button id="counter" type="button"></button></p>
      <p><div id="json"></div></p>
    </div>
  </div>
`

console.log(`attributes: ${attributes}`);
console.log(`toc: ${toc}`);

document.querySelector('#links').innerHTML = `${JSON.stringify(toc)}`;
document.querySelector('#json').innerHTML = `${JSON.stringify(json)}`

document.querySelector('#main').innerHTML += `
  <div>
    ${attributes?.title ? `<h1>Document title: ${attributes?.title}</h1>` : ''}
    ${attributes?.description ? `<p>Document description: ${attributes.description}</p>` : ''}
    ${attributes?.tags ? `<p>Tags: ( #${attributes?.tags?.join('; #')} )</p>` : ''}
    <p>${html}</p>
  </div>`;

setupCounter(document.querySelector('#counter'))
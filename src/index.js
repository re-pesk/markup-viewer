import './css/style.css';
import Vite from './img/vite.svg?raw';
import JS from './img/javascript.svg?raw';
import { setupCounter } from './js/counter.js';
import { loadParser } from './js/load-markdown-it.js'
import JSON5 from 'json5';

const metaData = {};
const mdParser = loadParser(metaData);

async function getResponseText(url) {
  return await fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      }
      return response.text();
    });
}

async function getContent() {
  const docContainer = document.createElement('div');
  docContainer.innerHTML = `
    <aside id="aside"></aside>
    <main id="main"></main>
  `;

  const aside = docContainer.querySelector('#aside');

  aside.innerHTML = `
    <div id="toc-container">
      <div id="toc-wrapper">
        <div>${Vite}${JS}</div>
        <h1>Contents</h1>
        <p><div id="toc"></div></p>
        <p><button id="counter" type="button"></button></p>
        <p><div id="json"></div></p>
      </div>
    </div>
  `
  const tocContainer = aside.querySelector('#toc-container');


  setupCounter(tocContainer.querySelector('#counter'))

  const testJson5Content = await getResponseText('/content/test.json5');
  tocContainer.querySelector('#json').innerHTML = JSON5.stringify(JSON5.parse(testJson5Content));

  let fileToLoad = '/content/index.md';
  if (window.location.search.slice(1)) {
    fileToLoad = `/content/${window.location.search.slice(1)}`;
  }
  const mdContent = await getResponseText(fileToLoad);
  const mdHtml = mdParser.render(mdContent);

  tocContainer.querySelector('#toc').innerHTML = metaData.toc;

  let frontMatter = '';
  if (metaData.frontMatter) {
    frontMatter = `<h1>${metaData.frontMatter.title}</h1><p>${metaData.frontMatter.description}</p><p>Tags: (${metaData.frontMatter.tags.join('; ')})</p>`;
  }
  docContainer.querySelector('#main').innerHTML = `${frontMatter}\n${mdHtml}`;


  return docContainer;
}

const content = await getContent();

document.body.appendChild(content);
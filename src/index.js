import './css/style.css';
// import Vite from './img/vite.svg?raw';
// import JS from './img/javascript.svg?raw';
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
  docContainer.classList.add("container");
  docContainer.innerHTML = `
    <aside>
      <div class="container side-panel left">
        <nav class="container">abc</nav>
        <div class="panel-content" id="index-wrapper"></div>
      </div>
    </aside>
    <main>
      <nav class="container"><div><button></button></div><div>a</div><div><button></button></div></nav>
      <div class="container">
        <section id="md-content"></section>
        <section id="html-content"></section>
      </div>
    </main>
    <aside>
      <div class="side-panel right">
        <nav class="container">abc</nav>
        <div class="panel-content" id="toc-wrapper"></div>
      </div>
    </aside>
`;

  docContainer.querySelector('#index-wrapper').innerHTML = `
    <h1>Index</h1>
    <p>
    <div id="index">
      <ul>
        <li>Vienas</li>
        <li>Du</li>
      </ul>
    </div>
    </p>
  `

  docContainer.querySelector('#toc-wrapper').innerHTML = `
    <h1>Contents</h1>
    <p><div id="toc"></div></p>
    <p><button id="counter" type="button"></button></p>
    <p><div id="json"></div></p>
  `
  setupCounter(docContainer.querySelector('#counter'))

  const testJson5Content = await getResponseText('/content/test.json5');
  docContainer.querySelector('#json').innerHTML = JSON5.stringify(JSON5.parse(testJson5Content));

  let fileToLoad = '/content/index.md';
  if (window.location.search.slice(1)) {
    fileToLoad = `/content/${window.location.search.slice(1)}`;
  }
  const mdContent = await getResponseText(fileToLoad);


  const mdHtml = mdParser.render(mdContent);

  docContainer.querySelector('#toc').innerHTML = metaData.toc;
  docContainer.querySelector('#md-content').innerHTML = `<pre>${mdContent}</pre>`;

  let frontMatter = '';
  if (metaData.frontMatter) {
    frontMatter = `<h1>${metaData.frontMatter.title}</h1><p>${metaData.frontMatter.description}</p><p>Tags: (${metaData.frontMatter.tags.join('; ')})</p>`;
  }
  docContainer.querySelector('#html-content').innerHTML = `${frontMatter}\n${mdHtml}`;
  // docContainer.querySelector('#html-content').innerHTML = `${mdHtml}`;

  return docContainer;
}

const content = await getContent();

document.body.appendChild(content);
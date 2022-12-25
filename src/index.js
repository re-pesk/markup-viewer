import './css/style.css';
import WebpackImg from './img/webpack.svg';
import JavascriptImg from './img/javascript.svg';
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
      <h1>Contents</h1>
      <div id="toc-wrapper">
        <p><div id="toc"></div></p>
        <p><button id="counter" type="button"></button></p>
        <p><div id="json"></div></p>
      </div>
    </div>
  `
  const tocContainer = aside.querySelector('#toc-container');

  // Add the image to our existing div.
  const webpackImg = new Image(50, 50);
  webpackImg.src = WebpackImg;
  const jsImg = new Image(50, 50);
  jsImg.src = JavascriptImg;
  
  tocContainer.insertAdjacentElement("afterbegin", jsImg);
  tocContainer.insertAdjacentElement("afterbegin", webpackImg);

  setupCounter(tocContainer.querySelector('#counter'))

  tocContainer.querySelector('#json').innerHTML = JSON5.stringify(JSON5.parse(await getResponseText('/content/test.json5')));

  const main = docContainer.querySelector('#main');

  // main.innerHTML = `
  // <div>
  //   ${attributes?.title ? `<h1>Document title: ${attributes?.title}</h1>` : ''}
  //   ${attributes?.description ? `<p>Document description: ${attributes.description}</p>` : ''}
  //   ${attributes?.tags ? `<p>Tags: ( #${attributes?.tags?.join('; #')} )</p>` : ''}
  //   <p>${html}</p>
  // </div>`;

  const mdContent = await getResponseText('/content/md-test.md');

  const mdHtml = mdParser.render(mdContent)

  // const metaHtml = `<h1>${metaData.title}</h1><p>${metaData.description}</p><p>Tags: ${metaData.tags.join(', ')}</p>`;
  const metaHtml = `<h1>${metaData.title}</h1><p>${metaData.description}</p><p>Tags: (${metaData.tags.join('; ')})</p>`;
  main.innerHTML = `${metaHtml}\n${mdHtml}`;

  return docContainer;
}

const content = await getContent();

document.body.appendChild(content);

import MarkdownIt from 'markdown-it';
import FrontMatter from 'markdown-it-front-matter';
// import Metadata from 'markdown-it-metadata-block';
import Sub from 'markdown-it-sub';
import Sup from 'markdown-it-sup';
import Footnote from 'markdown-it-footnote';
import Deflist from 'markdown-it-deflist';
import Abbr from 'markdown-it-abbr';
import Emoji from 'markdown-it-emoji';
import Container from 'markdown-it-bracketed-spans';
import BracketSpan from 'markdown-it-container';
import Insert from 'markdown-it-ins';
import Mark from 'markdown-it-mark';
import Admon from 'markdown-it-admon';
import MmdTable from 'markdown-it-multimd-table';
import YamlTable from 'markdown-it-complex-table';
import GridTable from 'markdown-it-gridtables';
import Attrs from '@sup39/markdown-it-attr';
import { asidePlugin as Aside } from '@humanwhocodes/markdown-it-markua-aside';
import Anchor from 'markdown-it-anchor';
// import Toc from 'markdown-it-table-of-contents';
import TocDoneRight from 'markdown-it-toc-done-right';
// import Replacements from 'markdown-it-replacements';
import YAML from 'yaml';

export const moduleDataList = [
  ['MarkdownIt', MarkdownIt],
  ['FrontMatter', FrontMatter],
  // ['Metadata', Metadata],
  ['Sub', Sub],
  ['Sup', Sup],
  ['Footnote', Footnote],
  ['Deflist', Deflist],
  ['Abbr', Abbr],
  ['Emoji', Emoji],
  ['Container', Container],
  ['BracketSpan', BracketSpan],
  ['Insert', Insert],
  ['Mark', Mark],
  ['Admon', Admon],
  ['MmdTable', MmdTable],
  ['YamlTable', YamlTable],
  ['GridTable', GridTable],
  ['Attrs', Attrs],
  ['Aside', Aside],
  ['Anchor', Anchor],
  // ['Toc', Toc],
  ['TocDoneRight', TocDoneRight],
  // ['Replacements', Replacements],
  ['YAML', YAML],
];

export const modules = Object.fromEntries(moduleDataList);

export const modulesOptions = {
  MarkdownIt: { html: true, xhtmlOut: true, linkify: true, typography: true },
  // Metadata: { parseMetadata: YAML.load, meta },
  Container: "spoiler",
  MmdTable : { multiline: true, rowspan: true, headerless: true, multibody: true, autolabel: true },
  Anchor: { permalink: Anchor.permalink.headerLink() },
  // Anchor: { permalink: modules.Anchor.permalink.linkInsideHeader({ symbol: '$', placement: 'before' }) },
  YAML: { defer: true },
}

// modules.Replacements.replacements.push({
//   name: 'allcaps',
//   re: /^Bandymas$/g,
//   sub: function (s) { return '# ' + meta.title; },
//   default: true
// });

export function loadParser(metaData) {

  modulesOptions.FrontMatter = (fm) => { 
    if (fm) {
      metaData['frontMatter'] = modules.YAML.parse(fm);
    }
  };

  modulesOptions.TocDoneRight = { callback: (html, ast) => {
    if (html) {
      metaData['toc'] = html;
    }
  }};

  const mdParser = new MarkdownIt({
    html: true,        // Enable HTML tags in source
    xhtmlOut: true,
    linkify: true,
    typography: true,
  })

  moduleDataList.forEach(moduleData => {
    if (modulesOptions[moduleData[0]]) {
      if (modulesOptions[moduleData[0]].defer) {
        return;
      }
      mdParser.use(modules[moduleData[0]], modulesOptions[moduleData[0]])
    } else {
      mdParser.use(modules[moduleData[0]])
    }
  })

  return mdParser;
}

export default { loadParser, modules };
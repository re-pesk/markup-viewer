const MarkdownIt = (await import('markdown-it')).default;

const moduleDataList = [
  // [ 'FrontMatter', (await import("markdown-it-front-matter")).default ],
  // [ 'Metadata', (await import("markdown-it-metadata-block")).default ],
  [ 'Sub', (await import(`markdown-it-sub`)).default ],
  [ 'Sup', (await import(`markdown-it-sup`)).default ],
  // [ 'Footnote', (await import("markdown-it-footnote")).default ],
  // [ 'Deflist', (await import("markdown-it-deflist")).default ],
  [ 'Abbr', (await import(`markdown-it-abbr`)).default ],
  // [ 'Emoji', (await import("markdown-it-emoji")).default ],
  // [ 'Container', (await import("markdown-it-bracketed-spans")).default ],
  // [ 'BracketSpan', (await import("markdown-it-container")).default ],
  [ 'Insert', (await import(`markdown-it-ins`)).default ],
  [ 'Mark', (await import(`markdown-it-mark`)).default ],
  // [ 'Admon', (await import("markdown-it-admon")).default ],
  // [ 'MmdTable', (await import("markdown-it-multimd-table")).default ],
  // [ 'YamlTable', (await import("markdown-it-complex-table")).default ],
  // [ 'GridTable', (await import("markdown-it-gridtables")).default ],
  // [ 'Attrs', (await import("markdown-it-attr")).default ],
  // [ 'Aside', (await import("markdown-it-markua-aside")).asidePlugin ],
  // [ 'Anchor', (await import("markdown-it-anchor")).default ],
  // [ 'Toc', (await import("markdown-it-table-of-contents")).default ],
  // [ 'Replacements', (await import("markdown-it-replacements")).default ],
  [ 'YAML', (await import("yaml")).default ],
];

export const modules = Object.fromEntries(moduleDataList);

export const modulesOptions = {
  MarkdownIt: { html: true, xhtmlOut: true, linkify: true, typography: true },
  // Metadata: { parseMetadata: YAML.load, meta },
  Container: "spoiler",
  MmdTable : { multiline: true, rowspan: true, headerless: true, multibody: true, autolabel: true },
  // Anchor: { permalink: modules.Anchor.permalink.headerLink() },
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
      const yaml = modules.YAML.parse(fm);
      Object.assign(metaData, yaml);
    }
  };

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
const { loadModules } = await import("./helpers.js");

const MarkdownIt = (await import('markdown-it')).default;

const moduleDataList = [
  // { name: 'FrontMatter', path: "./lib/markdown-it/markdown-it-front-matter.bundle.js", f: m => m.default },
  // { name: 'Metadata', path: "./lib/markdown-it/markdown-it-metadata-block.bundle.js", f: m => m.default },
  { name: 'Sub', path: "markdown-it-sub", import: 'default' },
  { name: 'Sup', path: "markdown-it-sup", import: 'default' },
  // { name: 'Footnote', path: "./lib/markdown-it/markdown-it-footnote.bundle.js", f: m => m.default },
  // { name: 'Deflist', path: "./lib/markdown-it/markdown-it-deflist.bundle.js", f: m => m.default },
  { name: 'Abbr', path: "markdown-it-abbr", import: 'default' },
  // { name: 'Emoji', path: "./lib/markdown-it/markdown-it-emoji.bundle.js", f: m => m.default },
  // { name: 'Container', path: "./lib/markdown-it/markdown-it-bracketed-spans.bundle.js", f: m => m.default },
  // { name: 'BracketSpan', path: "./lib/markdown-it/markdown-it-container.bundle.js", f: m => m.default },
  { name: 'Insert', path: "markdown-it-ins", import: 'default' },
  { name: 'Mark', path: "markdown-it-mark", import: 'default' },
  // { name: 'Admon', path: "./lib/markdown-it/markdown-it-admon.bundle.js", f: m => m.default },
  // { name: 'MmdTable', path: "./lib/markdown-it/markdown-it-multimd-table.bundle.js", f: m => m.default },
  // { name: 'YamlTable', path: "./lib/markdown-it/markdown-it-complex-table.bundle.js", f: m => m.default },
  // { name: 'GridTable', path: "./lib/markdown-it/markdown-it-gridtables.bundle.js", f: m => m.default },
  // { name: 'Attrs', path: "./lib/markdown-it/markdown-it-attr.bundle.js", f: m => m.default },
  // { name: 'Aside', path: "./lib/markdown-it/markdown-it-markua-aside.bundle.js", f: m => m.asidePlugin },
  // { name: 'Anchor', path: "./lib/markdown-it/markdown-it-anchor.bundle.js", f: m => m.default },
  // { name: 'Toc', path: "./lib/markdown-it/markdown-it-table-of-contents.bundle.js", f: m => m.default },
  // { name: 'Replacements', path: "./lib/markdown-it/markdown-it-replacements.bundle.js", f: m => m.default },
  // { name: 'YAML', path: "./lib/markdown-it/yaml.bundle.js", f: m => m.default },
]

export const modules = await loadModules(moduleDataList)

export const modulesOptions = {
  MarkdownIt: { html: true, xhtmlOut: true, linkify: true, typography: true },
  FrontMatter: { callback: (fm, token, state) => { 
      mdParser.yaml = '';
      if (fm) {
        const yaml = modules.YAML.parse(fm);
        console.log(`FrontMatter:\n`, yaml, yaml.title, yaml.b, yaml.tags);
        mdParser.yaml = yaml;
      }
    }
  },
  // Metadata: { parseMetadata: YAML.load, meta },
  Container: "spoiler",
  MmdTable : { multiline: true, rowspan: true, headerless: true, multibody: true, autolabel: true }
}

// modules.Replacements.replacements.push({
//   name: 'allcaps',
//   re: /^Bandymas$/g,
//   sub: function (s) { return '# ' + meta.title; },
//   default: true
// });

export function loadParser() {

  const mdParser = new MarkdownIt({
    html: true,        // Enable HTML tags in source
    xhtmlOut: true,
    linkify: true,
    typography: true,
  })
    // .use(modules.FrontMatter, {
    //   callback: (fm, token, state) => {
    //     mdParser.yaml = '';
    //     if (fm) {
    //       const yaml = modules.YAML.parse(fm);
    //       console.log(`FrontMatter:\n`, yaml, yaml.title, yaml.b, yaml.tags);
    //       mdParser.yaml = yaml;
    //     }
    //   }
    // })
    // .use(Metadata, {
    //   parseMetadata: YAML.load,
    //   meta
    // })
    // .use(modules.Replacements)
    // .use(modules.Sub)
    // .use(modules.Sup)
    // .use(modules.Footnote)
    // .use(modules.Deflist)
    // .use(modules.Abbr)
    // .use(modules.Emoji)
    // .use(modules.Container, "spoiler")
    // .use(modules.BracketSpan)
    // .use(modules.Insert)
    // .use(modules.Mark)
    // .use(modules.Admon)
    // .use(modules.GridTable)
    // .use(modules.MmdTable, {
    //   multiline: true,
    //   rowspan: true,
    //   headerless: true,
    //   multibody: true,
    //   autolabel: true,
    // })
    // .use(modules.YamlTable)
    // .use(modules.Attrs)
    // .use(modules.Aside)
    // .use(modules.Anchor, {
    //   permalink: modules.Anchor.permalink.headerLink()
    // })
    // .use(modules.Anchor, {
    //   permalink: modules.Anchor.permalink.linkInsideHeader({
    //     symbol: '$',
    //     placement: 'before'
    //   })
    // })
    // .use(modules.Toc);
    // .disable('anchor');
  // .use(TocDoneRight)

  moduleDataList.forEach(moduleData => {
    if (modulesOptions[moduleData.name]) {
      mdParser.use(modules[moduleData.name], modulesOptions[moduleData.name])
    } else {
      mdParser.use(modules[moduleData.name])
    }
  })

  return mdParser;
}

export default { loadParser, modules };
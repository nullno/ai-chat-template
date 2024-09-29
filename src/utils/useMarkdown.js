import MarkdownIt from 'markdown-it';
import texmath from 'markdown-it-texmath';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const useMarkdown = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});
useMarkdown.use(texmath, {
  engine: katex,
  delimiters: ['dollars', 'brackets', 'kramdown', 'doxygen']
});

export default useMarkdown;

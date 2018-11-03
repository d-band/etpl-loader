import tpl from './index.tpl';

window.ENCODE = (str) => {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

document.getElementById('root').innerHTML = tpl({
  name: 'hello',
  email: 'hello@example.com',
  skills: [
    '<a href="https://en.wikipedia.org/wiki/JavaScript">JavaScript</a>',
    '<a href="https://www.oracle.com/java/">Java</a>',
    '<a href="https://en.wikipedia.org/wiki/C%2B%2B">C++</a>',
    '<a href="https://golang.org">Go</a>'
  ],
  projects: [{
    name: '<a href="https://github.com/d-band/etpl-loader">etpl-loader</a>',
    description: 'Ejs template webpack loader.'
  }, {
    name: '<a href="https://github.com/d-band/dool">dool</a>',
    description: 'Build tool based on webpack.'
  }, {
    name: '<a href="https://github.com/d-band/yax">yax</a>',
    description: 'Yet another store using redux.'
  }],
  site: {
    name: 'D-Band',
    year: '2018'
  }
});
etpl-loader
===========

[![NPM version](https://img.shields.io/npm/v/etpl-loader.svg)](https://www.npmjs.com/package/etpl-loader)
[![NPM downloads](https://img.shields.io/npm/dm/etpl-loader.svg)](https://www.npmjs.com/package/etpl-loader)
[![Build Status](https://travis-ci.org/d-band/etpl-loader.svg?branch=master)](https://travis-ci.org/d-band/etpl-loader)
[![Coverage Status](https://coveralls.io/repos/github/d-band/etpl-loader/badge.svg?branch=master)](https://coveralls.io/github/d-band/etpl-loader?branch=master)
[![Dependency Status](https://david-dm.org/d-band/etpl-loader.svg)](https://david-dm.org/d-band/etpl-loader)

## Install

```
npm i etpl-loader -S
```

## Usage

**index.tpl**
```ejs
<p><%=name%></p>
<p><%=email%></p>
<ul>
  <%for (var i=0; i<skills.length; i++) {var skill = skills[i];%>
  <li><%-skill%></li>
  <%}%>
</ul>
<div>
  <%projects.forEach((project) => {%>
  <div>
    <h3><%-project.name%></h3>
    <p><%=project.description%></p>
  </div>
  <%});%>
</div>
<%include('footer.tpl')%>
```

**footer.tpl**
```ejs
<div>Copyright © <%=site.year%>&nbsp;<%=site.name%>. All Rights Reserved.</div>
```

**index.js**
```js
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
```

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [{
      test: /\.tpl$/,
      use: 'etpl-loader'
    }]
  }
}
```

## Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`globals`**|`{Array}`|`['window', 'console']`|Global variables|
|**`encode`**|`{String}`|`'ENCODE'`|Encode function name|

## Report a issue

* [All issues](https://github.com/d-band/etpl-loader/issues)
* [New issue](https://github.com/d-band/etpl-loader/issues/new)

## License

etpl-loader is available under the terms of the MIT License.

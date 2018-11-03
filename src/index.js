import loaderUtils from 'loader-utils';
import { transform } from '@babel/core';
import preParse from './preParse';

function ejsPlugin (babel, options) {
  const { types: t } = babel;
  const globals = options.globals || ['window', 'console'];
  const encodeFun = options.encode || 'ENCODE';
  return {
    visitor: {
      AssignmentExpression (path) {
        const left = path.get('left');
        const right = path.get('right');
        if (t.isMemberExpression(left) &&
          t.isFunctionExpression(right) &&
          left.node.object.name === 'module' &&
          left.node.property.name === 'exports') {
          // add param `data`
          right.node.params.push(t.identifier('data'));
          // rename variable
          const isGlobal = (v) => path.scope.globals[v];
          right.traverse({
            ReferencedIdentifier (p) {
              const v = p.node.name;
              if (isGlobal(v) && globals.indexOf(v) < 0) {
                if (v === 'ENCODE_FUNCTION') {
                  p.node.name = encodeFun;
                } else {
                  p.node.name = `data.${v}`;
                }
              }
            }
          });
        }
      }
    }
  };
}

module.exports = function (source) {
  const callback = this.async();
  const query = loaderUtils.getOptions(this) || {};
  try {
    const data = preParse(source, this.resourcePath);
    transform(`module.exports = function(){${data.result}}`, {
      plugins: [[ejsPlugin, query]]
    }, (err, result) => {
      callback(err, result.code);
    });
  } catch (err) {
    callback(err);
  }
};

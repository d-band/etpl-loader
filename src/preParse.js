import fs from 'fs';
import path from 'path';

function unescape (code) {
  return code.replace(/\\('|\\)/g, '$1').replace(/[\r\t\n]/g, ' ');
}

function format (str, filePath) {
  return str
    .replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, ' ')
    .replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, '')
    .replace(/<%(.+?)%>/g, (m, p) => {
      const code = p.trim();
      const first = code.slice(0, 1);
      if (first === '-') {
        return `';out+=(${unescape(code.slice(1))});out+='`;
      } else if (first === '=') {
        return `';out+=ESCAPE_FUNCTION(${unescape(code.slice(1))});out+='`;
      } else {
        const match = code.match(/^include\((.+)?\)$/);
        if (match) {
          if (!match[1]) {
            throw new Error('Include path is empty');
          }
          const base = path.dirname(filePath);
          const tplPath = unescape(match[1]).replace(/['"]/gim, '');
          const targetPath = path.resolve(base, tplPath);
          if (fs.statSync(targetPath).isFile()) {
            const content = fs.readFileSync(targetPath, 'utf-8');
            return format(content, targetPath);
          } else {
            throw new Error('Include path is not file');
          }
        } else {
          return `';${unescape(code)}\n out+='`;
        }
      }
    });
}

export default function preParse (source, filePath) {
  const code = source
    .replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, ' ')
    .replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, '')
    .replace(/'|\\/g, '\\$&');
  const result = `var out='${format(code, filePath)}';return out;`
    .replace(/\t/g, '\\t')
    .replace(/\r/g, '\\r')
    .replace(/(\s|;|\}|^|\{)out\+='';/g, '$1')
    .replace(/\+''/g, '')
    .replace(/(\s|;|\}|^|\{)out\+=''\+/g, '$1out+=')
    .replace(/out\+='(\s+)';/gi, '');

  return { source, result };
};

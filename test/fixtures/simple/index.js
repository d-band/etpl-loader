import tpl from './template.tpl';

console.log(tpl({
  name: 'hello',
  code: 'world',
  list: ['a', 'b', 'c']
}));
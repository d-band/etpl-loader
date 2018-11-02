import fs from 'fs';
import { join } from 'path';
import assert from 'assert';
import webpack from 'webpack';

const loader = join(__dirname, '../src/index.js');

function build(dir, callback, isEscape) {
  const cwd = join(__dirname, 'fixtures', dir);
  const outputPath = join(cwd, 'dist');
  const expectPath = join(__dirname, 'expects', dir);
  const config = {
    mode: 'none',
    entry: {
      index: join(cwd, 'index.js')
    },
    output: {
      path: outputPath
    },
    module: {
      rules: [{
        test: /\.tpl?/,
        loader: `${loader}?${isEscape ? 'escape=window.escape' : ''}`,
        exclude: /node_modules/,
      }]
    }
  };
  webpack(config, (err, stats) => {
    const msg = stats.compilation.errors.map(e => e.message).join('\n');
    const error = msg ? new Error(msg) : err;
    if (error) {
      callback(error);
      return;
    }

    const actual = fs.readFileSync(join(outputPath, 'index.js'), 'utf-8');
    const expectFile = join(expectPath, 'index.js');
    if (process.env.GEN_EXPECT) {
      fs.writeFileSync(expectFile, actual);
    }

    const expect = fs.readFileSync(expectFile, 'utf-8');
    assert.strictEqual(actual, expect);
    
    callback();
  });
}

describe('loader test', function () {
  this.timeout(0);

  it('should support simple ejs template', done => {
    build('simple', done);
  });

  it('should support include template', done => {
    build('include', done);
  });

  it('should support custom escape', done => {
    build('escape', done, true);
  });

  it('should support include error', done => {
    build('include-error', err => {
      assert.ok(/Include path is empty/.test(err.message));
      done();
    });
  });

  it('should support include file not found error', done => {
    build('nofile-error', err => {
      assert.ok(/no such file or directory/.test(err.message));
      done();
    });
  });

  it('should support include not file error', done => {
    build('notfile-error', err => {
      assert.ok(/Include path is not file/.test(err.message));
      done();
    });
  });
});

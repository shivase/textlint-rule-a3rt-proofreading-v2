/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import path from 'path';
import { use, expect } from 'chai';
import chaiAsPromised = require('chai-as-promised');

// import { TextLintEngine, TextLintCore } from 'textlint';
import { TextLintEngine } from 'textlint';
// import rule from '../src/textlint-rule-a3rt-proofreading-v2';
import { server } from './mocks/server';

use(chaiAsPromised);

describe('.textlintrc test', () => {
  beforeEach(() => {
    server.listen();
  });

  context('when use .textlintrc', () => {
    it('should return valid result', async () => {
      const engine = new TextLintEngine({
        configFile: path.join(__dirname, 'fixtures/.textlintrc'),
        rulesBaseDirectory: path.join(__dirname, '../src'),
      });

      return engine
        .executeOnText('システムの企画から開発・運用まで幅拾く関われまs。')
        .then(([result]) => {
          expect(result.messages).length(2);
          expect(result.messages[0].line === 1);
          expect(result.messages[1].line === 1);
        });
    });
  });

  context('when use .textlintrc.invalid', () => {
    it('should throw error', async () => {
      const engine = new TextLintEngine({
        configFile: path.join(__dirname, 'fixtures/.textlintrc.invalid'),
        rulesBaseDirectory: path.join(__dirname, '../src'),
      });

      await expect(engine.executeOnText('text')).to.eventually.be.rejected;
    });
  });
});

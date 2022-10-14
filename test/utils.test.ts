/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';
import { expect, assert } from 'chai';
import * as utils from '../src/utils';

describe('utils test', () => {
  it('should return apiKey', () => {
    const yaml = path.join(__dirname, 'fixtures/key.yaml');
    const config = utils.readConfigFromYAML(yaml);
    expect(config.rules.apiKey).to.not.equal(null);
  });
  context('exception test', () => {
    it('should error when invalid file path', () => {
      try {
        utils.readConfigFromYAML('');
        assert.fail('exception not thrown');
      } catch (e: any) {
        if (e instanceof Error) {
          expect(e.message).contains('no such file or directory');
        } else {
          assert.fail('unknown exception');
        }
      }
    });
    it('should error when invalid file format', () => {
      try {
        const yaml = path.join(__dirname, 'fixtures/key.yaml.invalid');
        utils.readConfigFromYAML(yaml);
        assert.fail('exception not thrown');
      } catch (e: any) {
        if (e instanceof Error) {
          expect(e.message).contains('apiKey not found');
        } else {
          assert.fail('unknown exception');
        }
      }
    });
  });
});

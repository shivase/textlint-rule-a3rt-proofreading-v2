import { assert, expect } from 'chai';
import proofreading from '../src/proofreading-v2-typo';
import { server } from './mocks/server';

describe('proofreading test', () => {
  beforeEach(() => {
    server.listen();
  });

  context('when no match', () => {
    it('should no error', async () => {
      const result = await proofreading(
        'OK_APIKEY',
        'システムの企画から開発・運用まで幅広く関われます。',
      );
      expect(result.length).to.equal(0);
    });
  });

  context('when matched', () => {
    it('should return array result', async () => {
      const result = await proofreading(
        'OK_APIKEY',
        'システムの企画から開発・運用まで幅拾く関われまs。',
      );
      expect(result.length).to.equal(2);
    });
  });

  context('when apikey error occured', () => {
    it('should return error log', async () => {
      try {
        await proofreading(
          'NG_APIKEY',
          'システムの企画から開発・運用まで幅拾く関われまs。',
        );
        assert.fail('Exception not thrown');
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message).contains('apikey is null');
        }
      }
    });
  });
});

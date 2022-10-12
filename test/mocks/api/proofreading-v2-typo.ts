import { ResponseResolver, MockedRequest, restContext } from 'msw';

const response: ResponseResolver<MockedRequest, typeof restContext> = (
  req,
  res,
  ctx,
) => {
  const apikey = req.url.searchParams.get('apikey');
  const sentence = req.url.searchParams.get('sentence');

  if (apikey === 'NG_APIKEY') {
    return res(
      ctx.status(400),
      ctx.json({ message: 'apikey is null', status: 1000 }),
    );
  }
  if (sentence === 'システムの企画から開発・運用まで幅広く関われます。') {
    return res(
      ctx.status(200),
      ctx.json({
        resultID: '41603478d4cd',
        status: 0,
        message: 'ok',
        inputSentence: 'システムの企画から開発・運用まで幅広く関われます。',
        normalizedSentence:
          'システムの企画から開発・運用まで幅広く関われます。',
        checkedSentence: 'システムの企画から開発・運用まで幅広く関われます。',
      }),
    );
  }
  if (sentence === 'システムの企画から開発・運用まで幅拾く関われまs。') {
    return res(
      ctx.status(200),
      ctx.json({
        resultID: '3df3c5d0cc7f',
        status: 1,
        message: 'pointed out',
        inputSentence: 'システムの企画から開発・運用まで幅拾く関われまs。',
        normalizedSentence: 'システムの企画から開発・運用まで幅拾く関われまs。',
        checkedSentence:
          'システムの企画から開発・運用まで幅 <<拾>> く関われま <<s>> 。',
        alerts: [
          { pos: 17, word: '拾', score: 1, suggestions: ['広', '全', '深'] },
          {
            pos: 23,
            word: 's',
            score: 0.999999883978465,
            suggestions: ['す', 'し', 'い'],
          },
        ],
      }),
    );
  }

  return res(ctx.status(404), ctx.json({}));
};

export default response;

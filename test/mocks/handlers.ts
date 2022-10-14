import { rest } from 'msw';
import typo from './api/proofreading-v2-typo';

const TYPO_URL = 'https://api.a3rt.recruit.co.jp/proofreading/v2/typo';

const handler = [rest.get(TYPO_URL, typo)];

export default handler;

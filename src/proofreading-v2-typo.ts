/* eslint-disable no-console */
import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://api.a3rt.recruit.co.jp/proofreading/v2/typo';

type TypoResponse = {
  resultID: string;
  status: number;
  message: string;
  inputSentence: string;
  normalizedSentence: string;
  checkedSentence: string;
  alerts: {
    pos: number;
    word: string;
    score: number;
    suggestions: string[];
  }[];
};

export type ProofreadingResult = {
  message: string;
  pos: number;
};

const getProofreading = async (
  apikey: string,
  sentence: string,
): Promise<ProofreadingResult[]> => {
  const result: ProofreadingResult[] = [];
  try {
    const response: AxiosResponse<TypoResponse> = await axios.request({
      url: API_URL,
      method: 'GET',
      params: {
        apikey,
        sentence,
        sensitivity: 'low',
      },
    });
    const { data, status } = response;

    if (status === 200) {
      if (data.alerts) {
        data.alerts.forEach((alert) => {
          const message = `Suggest: '${
            alert.word
          }' => '${alert.suggestions.join('|')}' (score:${alert.score.toFixed(
            2,
          )})`;

          result.push({ message, pos: alert.pos });
        });
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data) {
        throw new Error(
          `textlint-rule-a3rt-proofreading-v2 server returned error: ${JSON.stringify(
            error.response.data,
          )}`,
        );
      } else {
        console.error(
          `textlint-rule-a3rt-proofreading-v2 error: ${error.message}`,
        );
      }
    } else {
      console.error(
        'textlint-rule-a3rt-proofreading-v2 something wrong happened',
      );
    }
  }

  return result;
};

export default getProofreading;

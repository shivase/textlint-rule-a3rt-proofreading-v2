import { TextlintRuleModule, TextlintRuleOptions } from '@textlint/types';
import proofreadingTypo from './proofreading-v2-typo';
import { readConfigFromYAML, Config } from './utils';

export interface Options {
  // if the Str includes `allows` word, does not report it
  allows?: string[];
  apiKey?: string;
}

const readOptions = (options: TextlintRuleOptions<Options>): Config => {
  const errMessage = `textlint-rule-a3rt-proofreading-v2 require apiKey Options.
Please set .textlintrc:
{
    "rules": {
        "a3rt-proofreading-v2": {
            "apiKey" :"path/to/api.yml"
        }
    }
}
`;
  if (typeof options.apiKey === 'undefined') {
    throw new Error(errMessage);
  }

  return readConfigFromYAML(options.apiKey);
};

const proofreading: TextlintRuleModule<Options> = (context, options = {}) => {
  const config = readOptions(options);

  const { Syntax, RuleError, report, getSource } = context;

  return {
    async [Syntax.Paragraph](node) {
      const text = getSource(node);

      const result = await proofreadingTypo(config.rules.apiKey, text);
      result.forEach((alert) => {
        const ruleError = new RuleError(alert.message, {
          index: alert.pos,
        });
        report(node, ruleError);
      });
    },
  };
};
export default proofreading;

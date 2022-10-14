
# textlint-rule-a3rt-proofreading-v2 
[![Actions Status: test](https://github.com/shivase/textlint-rule-a3rt-proofreading-v2/workflows/test/badge.svg)](https://github.com/shivase/textlint-rule-a3rt-proofreading-v2/actions?query=workflow%3A"test")

リクルートの提供する文章校閲APIの、[Proofreading API](https://a3rt.recruit.co.jp/product/proofreadingAPI/)Iを使ったtextlintプラグインです。

[textlint-rule-a3rt-proofreading](https://github.com/sters/textlint-rule-a3rt-proofreading)がドメインの変更などで動かなっていたので、新たに参考にさせていただいて作りました。

## Install

Install with [npm](https://www.npmjs.com/):

```bash
npm install textlint-rule-a3rt-proofreading-v2
```

## Usage

### Installation

Via `.textlintrc`(Recommended)

```json
{
  "rules": {
    "a3rt-proofreading-v2": {
      "apiKey": "./path/to/key.yaml"
    }
  }
}
```

Get API Key from [Proofreading API](https://a3rt.recruit.co.jp/product/proofreadingAPI/registered/)

And set yaml like below.

```yaml
version: 1
rules:
  apiKey: 'APIKEY'
```

### Check rules

Via CLI

```bash
textlint --rule a3rt-proofreading-v2 README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

```bash
npm run build
```

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

```bash
npm test
```

## License

MIT ©

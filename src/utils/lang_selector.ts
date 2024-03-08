import commons = require('./../../lang/lang-common.json');

const AVAILABLE_LANGUAGES: string[] = ["EN", "JP"];
let language: string = "EN";
if (!AVAILABLE_LANGUAGES.includes(language)) {
    console.warn(commons.log.warning.invalidLanguage);
    language = "EN";
}

export function getLangJSONText(keyword: string) : string {
    const languageFile = require(`./../../lang/lang-${language}.json`);
    return languageFile[keyword];
}

module.exports = { getLangJSONText };

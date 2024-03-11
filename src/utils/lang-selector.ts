import 'dotenv/config';
import commons = require('../../lang/lang-common.json');

const SUPPORTED_LANGUAGES: string[] = ["EN", "JP"];
let configLanguage: string = process.env.LANGUAGE;

if (configLanguage !== "EN") { console.log(commons.log.task.verifyingLang.replace('{LANGUAGE}', configLanguage)); }
if (SUPPORTED_LANGUAGES.includes(configLanguage)) {
    console.log(commons.log.success.onValidLanguage.replace('{LANGUAGE}', configLanguage));
} else {
    console.warn(`\u001b[31m` + commons.log.warning.invalidLanguage.replace('{LANGUAGE}', configLanguage) + `\u001b[0m`);
    configLanguage = "EN";
}

const BOT_LANGUAGE: string = configLanguage;
export function getLangJSONText(keyword: string) : string {
    const languageFile = require(`./../../lang/lang-${BOT_LANGUAGE}.json`);
    return languageFile[keyword];
}

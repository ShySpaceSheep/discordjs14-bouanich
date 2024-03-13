import 'dotenv/config';
import commons = require('../../lang/lang-common.json');

const SUPPORTED_LANGUAGES: string[] = ["EN", "JP"];

export function setGlobalLanguage(): string {
    let configLanguage: string = process.env.LANGUAGE;

    if (configLanguage !== "EN") { console.log(commons.log.task.verifyingLang.replace('{LANGUAGE}', configLanguage)); }
    if (SUPPORTED_LANGUAGES.includes(configLanguage)) {
        console.log(commons.log.success.onValidLanguage.replace('{LANGUAGE}', configLanguage));
        return configLanguage;
    } else {
        console.warn(`\u001b[31m` + commons.log.warning.invalidLanguage.replace('{LANGUAGE}', configLanguage) + `\u001b[0m`);
        return "EN";
    }
}

export function getLangJSONText(keyword: string, language: string) : string {
    const languageFile = require(`./../../lang/lang-${language}.json`);
    return languageFile[keyword];
}

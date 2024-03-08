import 'dotenv/config';
import commons = require('../../lang/lang-common.json');

const AVAILABLE_LANGUAGES: string[] = ["EN", "JP"];
let envLanguage: string = process.env.LANGUAGE;

if (envLanguage !== "EN") { console.log(commons.log.task.verifyingLang.replace('{LANGUAGE}', envLanguage)); }
if (AVAILABLE_LANGUAGES.includes(envLanguage)) {
    console.log(commons.log.success.onValidLanguage.replace('{LANGUAGE}', envLanguage));
} else {
    console.warn(`\u001b[31m` + commons.log.warning.invalidLanguage.replace('{LANGUAGE}', envLanguage) + `\u001b[0m`);
    envLanguage = "EN";
}

const LANGUAGE: string = envLanguage;
export function getLangJSONText(keyword: string) : string {
    const languageFile = require(`./../../lang/lang-${LANGUAGE}.json`);
    return languageFile[keyword];
}

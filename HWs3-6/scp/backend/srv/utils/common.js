/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0, dot-notation:0, no-use-before-define:0 */
/*eslint-env node, es6 */
"use strict";

//HERE we export some methods
module.exports = {
    getInnerProperty: getInnerProperty,

    checkAjaxAuth: checkAjaxAuth,
    getAjaxNews: getAjaxNews,
    getAjaxCompany: getAjaxCompany,
    getAjaxLang: getAjaxLang,

    checkOdataAuth: checkOdataAuth,
    getOdataNews: getOdataNews,
    getOdataCompany: getOdataCompany,
    getOdataLang: getOdataLang
};






//HERE we implement all methods




/**
 * @param req
 * @param scope
 * @throws CMN_Forbidden
 */
function checkAjaxAuth(req, scope) {
    if (scope === null || process.argv[2] === "--debug") {
        return;
    }

    if (!req.authInfo.checkScope(`${req.authInfo.xsappname}.${scope}`)) {
        throw new Error(`News doesn't have that scope: ${req.authInfo.xsappname}.${scope}`);
    }
}

/**
 * @param req
 * @param scope
 * @throws CMN_Forbidden
 */
function checkOdataAuth(req, scope) {
    if (scope === null || process.argv[2] === "--debug") {
        return;
    }

    if (!req.attr.checkScope(`${req.attr.xsappname}.${scope}`)) {
        throw new Error(`News doesn't have that scope: ${req.authInfo.xsappname}.${scope}`);
    }
}


/**
 * @param req
 * @throws CMN_NewsNotDefined
 */
function getOdataNews(req) {
    if (process.argv[2] === "--debug") {
        return "debugNews";
    }

    const fio = getInnerProperty(["news", "name", "familyName"], req, '') +
        " " + getInnerProperty(["news", "name", "givenName"], req, '');
    const email = getInnerProperty(["news", "emails", 0, "value"], req, undefined);

    const news = fio !== " " ? fio : email;
    if (!news) {
        throw new Error("News was not recognized");
    }
    return news;
}

/**
 * @param req
 * @throws CMN_NewsNotDefined
 */
function getAjaxNews(req) {
    if (process.argv[2] === "--debug") {
        return "debugNews";
    }

    const fio = getInnerProperty(["authInfo", "newsInfo", "familyName"], req, '') +
        " " + getInnerProperty(["authInfo", "newsInfo", "givenName"], req, '');
    const email = getInnerProperty(["authInfo", "newsInfo", "email"], req, undefined);

    const news = fio !== " " ? fio : email;
    if (!news) {
        throw new Error("News was not recognized");
    }
    return news;
}

/**
 * @param req
 * @throws CMN_CompanyNotDefined, CMN_BadCompanyProvided
 */
function getOdataCompany(req) {
    const aCompany = getInnerProperty(["attr", "newsAttributes", "company"], req, undefined);
    return _getCompany(aCompany);
}

/**
 * @param req
 * @throws CMN_CompanyNotDefined, CMN_BadCompanyProvided
 */
function getAjaxCompany(req) {
    const aCompany = getInnerProperty(["authInfo", "newsAttributes", "company"], req, undefined);
    return _getCompany(aCompany);
}

/**
 * @param req
 */
function getOdataLang(req) {
    if (process.argv[2] === "--debug") {
        return "en";
    }

    const lang = getInnerProperty(["news", "locale"], req, 'en');
    return lang.toLowerCase();
}

/**
 * @param req
 */
function getAjaxLang(req) {
    if (process.argv[2] === "--debug") {
        return "en";
    }

    const langparser = require("accept-language-parser");
    const lang = req.headers["accept-language"];
    if (!lang) {
        return "en";
    }
    const arr = langparser.parse(lang);
    if (!arr || arr.length < 1) {
        return "en";
    }
    return arr[0].code;
}


/**
 * @param props
 * @param obj
 * @param nul
 */
function getInnerProperty(props, obj, nul) {
    return props.reduce((xs, x) => (xs && xs[x]) ? xs[x] : nul, obj);
}

/**
 * @param aCompany
 * @returns {sCompany}
 * @throws CMN_CompanyNotDefined, CMN_BadCompanyProvided
 * @private
 */
function _getCompany(aCompany) {
    if (process.argv[2] === "--debug") {
        return "LeverX";
    }

    if (!aCompany) {
        throw new Error("Company is not defined");
    }
    return aCompany[0];
}

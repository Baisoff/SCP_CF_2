/*eslint no-unused-vars: 0, no-undef:0, no-process-exit:0, new-cap:0*/
/*eslint-env node, es6 */
"use strict";

const dbClass = require(global.__base + "utils/dbClass");
const hdbext = require("@sap/hdbext");
const COMMON = require(global.__base + "utils/common");

const addWhereClause = (req, aWhere) => {
    req.query.SELECT.where = req.query.SELECT.where ?
        req.query.SELECT.where.concat(["and"]).concat(aWhere) :
        aWhere;

};
const getCompanyClause = sCompany => [{ref: ["mandt"]}, "=", {val: sCompany}];
const getLangClause = sLang => [{ref: ["lang"]}, "=", {val: sLang}];

module.exports = function () {
    this.before("READ", req => {
        req.log.debug(`BEFORE_READ ${req.target["@Common.Label"]}`);

        //restrict by mandt
        // addWhereClause(req, getCompanyClause("LeverX"));

        //restrict by lang
        // addWhereClause(req, getLangClause("EN"));
    });

    this.on("CREATE", "News", async (News) => {
        COMMON.checkOdataAuth(req, "himta.edit");
        req.log.debug(`ON CREATE ${req.target["@Common.Label"]}`);

        const {
            data
        } = News;
        if (data.length < 1) {
            return null;
        }

        const dbClass = require(global.__base + "utils/dbPromises");
        var client = await dbClass.createConnection();
        let db = new dbClass(client);

        if (!data.NID) {
            data.NID = await db.getNextval("nid");
//		throw new Error(`Invalid email for ${data.FIRSTNAME}. No Way! E-Mail must be valid and ${data.EMAIL} has problems`);
        }

        const sSql = `INSERT INTO "NEWS" VALUES(?,?)`
        const aValues = [oNews.nid, oNews.Header];

        req.log.debug(aValues);
        req.log.debug(sSql);
        await db.executeUpdate(sSql, aValues);

        return data;
    });


    this.after("READ", "News", (entity) => {
        if (entity.length > 0) {
            // entity.forEach(item => item.mandt = "");
            //entity.forEach(item => item.name = "");
        }
    });

};

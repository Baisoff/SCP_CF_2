/*eslint no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

const express = require("express");

const dbClass = require(global.__base + "utils/dbClass");

const COMMON = require(global.__base + "utils/common");

function _prepareObject(oNews, req) {
    const news = COMMON.getAjaxNews(req);

		oNews.changedBy = news;
    return oNews;
}

module.exports = () => {
    const app = express.Router();

    app.get("/", async (req, res, next) => {
        try {
            COMMON.checkAjaxAuth(req, "himta.view");
            
            const logger = req.loggingContext.getLogger("/Application");
        		logger.info('news get request');
        		let tracer = req.loggingContext.getTracer(__filename);
        		tracer.entering("/news", req, res);

            tracer.exiting("/news", "News Get works");
            res.type("application/json").status(201).send(JSON.stringify({text: "News Get works"}));
        } catch (e) {
            tracer.catching("/news", e);
            next(e);
        }
    });

    app.post("/", async (req, res, next) => {
        try {
            const logger = req.loggingContext.getLogger("/Application");
            logger.info('news POST request');
            let tracer = req.loggingContext.getTracer(__filename);
            tracer.entering("/news", req, res);


            const db = new dbClass(req.db);
            const oNews = _prepareObject(req.body, req);

            onews.nid = await db.getNextval("nid");
            const sSql = "INSERT INTO \"NEWS\" VALUES(?,?)";
            const aValues = [oNews.nid, oNews.Header];
            const oNewsSqlPromise = db.executeUpdate(sSql, aValues);

            const sSqlCategory = "INSERT INTO \"CATEGORY\" VALUES(\"cid\".NEXTVAL,?,?,?,?)";
            const aValuesCategory = [oNews.nid, oNews.toCategory.cid, oNews.toCategory.name, oNews.toCategory.description];
            const oCategorySqlPromise = db.executeUpdate(sSqlCategory, aValuesCategory);


            Promise.all([oNewsSqlPromise, oCategorySqlPromise])
                .then(() => res.type("application/json").status(201).send(JSON.stringify(oNews)))
                .catch((err) => res.type("application/json").status(500).send(JSON.stringify(err)));
        } catch (e) {
            next(e);
        }
    });


    app.put("/", async (req, res, next) => {
        try {
            const db = new dbClass(req.db);

            const oNews = _prepareObject(req.body, req);
            const sSql = "UPDATE \"NEWS\" SET \"HEADER\" = ? WHERE \"NID\" = ?";
						const aValues = [ oNews.Header, oNews.nid ];

            await db.executeUpdate(sSql, aValues);

            res.type("application/json").status(200).send(JSON.stringify(oNews));
        } catch (e) {
            next(e);
        }
    });

    return app;
};

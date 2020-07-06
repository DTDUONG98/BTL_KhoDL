'use strict'

const router = require('express').Router()
const sql = require('mssql')

router.get('/', async (req, res, next) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('mssql://sa:12345678@localhost/DW')
        const result = await sql.query`
            SELECT * 
                FROM ThoiGian as tg
                INNER JOIN Fact2 as f2 ON tg.Ma_TG = f2.Ma_TG
                INNER JOIN CuaHang as ch ON f2.Ma_CH = ch.Ma_CH
                INNER JOIN VanPhongDaiDien as vp ON vp.Ma_TP = f2.Ma_TP
        `
        res.json(result.recordset)
    } catch (err) {
        // ... error checks
    }
})

module.exports = router
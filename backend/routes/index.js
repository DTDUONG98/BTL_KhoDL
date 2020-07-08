'use strict'

const router = require('express').Router()
const sql = require('mssql')
/*
1. Tìm tất cả các cửa hàng cùng với thành phố, bang, số điện thoại,
mô tả, kích cỡ, trọng lượng và đơn giá của tất cả các mặt hàng được bán ở kho đó.
*/
router.post('/', async (req, res, next) => {
    try {
        let TypeOfTime = req.body.TypeOfTime
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('mssql://sa:12345678@localhost/DW')
        let query = `
            SELECT mh.Ma_MH as Ma_MH, SUM(f1.SoLuongDat) as SoLuongDat, SUM(f1.TongTien) as TongTien, SUM(f2.SoLuong) as SoLuong
                FROM Mathang as mh
                INNER JOIN Fact1 as f1 ON mh.Ma_MH = f1.Ma_MH
                INNER JOIN Fact2 as f2 ON mh.Ma_MH = f2.Ma_MH
                INNER JOIN ThoiGian as tg ON tg.Ma_TG = f1.Ma_TG
            GROUP BY tg.${TypeOfTime}, mh.Ma_MH
        `
        const result = await sql.query(query)
        console.log(query)
        //res.json(result.recordset)
        res.json({
            hello: "mother fucker"
        })
    } catch (err) {
        // ... error checks
    }
})
/*
2. Tìm tất cả các đơn đặt hàng với tên khách hàng và ngày đặt hàng được thực hiện bởi khách hàng đó
*/
router.get('/2', async (req, res, next) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('mssql://sa:12345678@localhost/DW')
        const result = await sql.query`
            SELECT * 
                FROM DonDatHang as d
        `
        res.json(result.recordset)
    } catch (err) {
        // ... error checks
    }
})
/* 
3. Tìm tất cả các cửa hàng cùng với tên thành phố và số điện thoại mà có bán các mặt hàng 
    được đặt bởi một khách hàng nào đó
*/

/*
4. Tìm địa chỉ văn phòng đại diện với tên thành phố, bang của tất cả các cửa hàng lưu kho một mặt hàng nào đó với số lượng trên mức cụ thể.
*/

/*
5. Với mỗi một đơn đặt hàng của khách, liệt kê các mặt hàng được đặt cùng với mô tả, mã cửa hàng, tên thành phố và các cửa hàng có bán mặt hàng đó.
*/

/*
6. Tìm thành phố và bang mà một khách hàng nào đó sinh sống
*/

/*
7. Tìm mức độ tồn kho của một mặt hàng cụ thể tại tất cả các cửa hàng ở một thành phố cụ thể nào đó
*/

/*
8. Tìm các mặt hàng, số lượng đặt, khách hàng, cửa hàng và thành phố của một đơn đặt hàng.
*/

/*
9. Tìm các khách hàng du lịch, khách hàng đặt theo đường bưu điện và khách hàng thuộc cả hai loại
*/

module.exports = router
'use strict'

const router = require('express').Router()
const sql = require('mssql')
const IP = "localhost"

router.post('/', async (req, res, next) => {
    try {
        let {Ngay, Thang, Quy, Nam} = req.body

        let filter = ""
        if (Ngay) filter = ` ${filter} AND tg.Ngay = ${Ngay} `
        if (Thang) filter = ` ${filter} AND tg.Thang = ${Thang} `
        if (Quy) filter = ` ${filter} AND tg.Quy = ${Quy} `
        if (Nam) filter = ` ${filter} AND tg.Nam = ${Nam} `
        
        // make sure that any items are correctly URL encoded in the connection string
        
        await sql.connect(`mssql://sa:12345678@${IP}/DW`)
        let query = `
            SELECT DISTINCT mh.Ma_MH as Ma_MH, SUM(f1.SoLuongDat) as SoLuongDat, SUM(f1.TongTien) as TongTien, SUM(f2.SoLuong) as SoLuong
                FROM Mathang as mh
                INNER JOIN Fact1 as f1 ON mh.Ma_MH = f1.Ma_MH
                INNER JOIN Fact2 as f2 ON mh.Ma_MH = f2.Ma_MH
                INNER JOIN ThoiGian as tg ON tg.Ma_TG = f1.Ma_TG ${filter}
            GROUP BY mh.Ma_MH
            `;
        console.log(query)
        const result = await sql.query(query)
        
        //res.json(result.recordset)
        res.json(result.recordset)
    } catch (err) {
        // ... error checks
    }
})

/* XONG
1. Tìm tất cả các cửa hàng cùng với thành phố, bang, số điện thoại,
mô tả, kích cỡ, trọng lượng và đơn giá của tất cả các mặt hàng được bán ở kho đó.
*/
router.post('/1', async (req, res, next) => {
    try {
        let {Ngay, Thang, Quy, Nam} = req.body

        let filter = ""
        if (Ngay) filter = ` ${filter} AND tg.Ngay = ${Ngay} `
        if (Thang) filter = ` ${filter} AND tg.Thang = ${Thang} `
        if (Quy) filter = ` ${filter} AND tg.Quy = ${Quy} `
        if (Nam) filter = ` ${filter} AND tg.Nam = ${Nam} `
        
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(`mssql://sa:12345678@${IP}/DW`)
        let query = `
            SELECT DISTINCT ch.Ma_CH as Ma_CH, ch.SoDienThoai as SoDienThoai, vp.Ten_TP as Ten_TP, vp.Bang as Bang,mh.Ma_MH AS Ma_MH, mh.MoTa as MoTa, mh.KichCo as KichCo, mh.Gia as Gia, mh.TrongLuong as TrongLuong  
                FROM CuaHang as ch
                INNER JOIN Fact2 as f2 ON ch.Ma_CH = f2.Ma_CH 
                INNER JOIN ThoiGian as tg ON tg.Ma_TG = f2.Ma_TG ${filter}
                INNER JOIN VanPhongDD as vp ON f2.Ma_TP = vp.Ma_TP
                INNER JOIN MatHang as mh ON f2.Ma_MH = mh.Ma_MH
        `
        console.log("Query 1:",query)
        const result = await sql.query(query)
        res.json(result.recordset)
    } catch (err) {
        // ... error checks
    }
})
/* XONG
2. Tìm tất cả các đơn đặt hàng với tên khách hàng và ngày đặt hàng được thực hiện bởi khách hàng đó
*/
router.post('/2', async (req, res, next) => {
    try {
        let {Ngay, Thang, Quy, Nam} = req.body

        let filter = ""
        if (Ngay) filter = ` ${filter} AND tg.Ngay = ${Ngay} `
        if (Thang) filter = ` ${filter} AND tg.Thang = ${Thang} `
        if (Quy) filter = ` ${filter} AND tg.Quy = ${Quy} `
        if (Nam) filter = ` ${filter} AND tg.Nam = ${Nam} `
        
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(`mssql://sa:12345678@${IP}/DW`)
        let query = `
            SELECT DISTINCT d.Ma_Don AS Ma_Don,kh.Ma_KH AS Ma_KH, kh.TenKH AS TenKH, d.NgayDatHang AS NgayDatHang
                FROM DonDatHang AS d
                INNER JOIN Fact1 AS f1 ON d.Ma_Don = f1.Ma_Don
                INNER JOIN KhachHang AS kh ON kh.Ma_KH = f1.Ma_KH
                INNER JOIN ThoiGian as tg ON tg.Ma_TG = f1.Ma_TG ${filter}          
        `
        console.log("Query 2", query)
        const result = await sql.query(query)
        res.json(result.recordset)
    } catch (err) {
        // ... error checks
    }
})
/* XONG
3. Tìm tất cả các cửa hàng cùng với tên thành phố và số điện thoại mà có bán các mặt hàng 
    được đặt bởi một khách hàng nào đó
*/
router.post('/3', async (req, res, next) => {
    try {
        let {Ngay, Thang, Quy, Nam} = req.body

        let filter = ""
        if (Ngay) filter = ` ${filter} AND tg.Ngay = ${Ngay} `
        if (Thang) filter = ` ${filter} AND tg.Thang = ${Thang} `
        if (Quy) filter = ` ${filter} AND tg.Quy = ${Quy} `
        if (Nam) filter = ` ${filter} AND tg.Nam = ${Nam} `
        
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(`mssql://sa:12345678@${IP}/DW`)
        let query = `
            SELECT DISTINCT ch.Ma_CH as Ma_CH, ch.SoDienThoai as SoDienThoai, vp.Ten_TP as Ten_TP, vp.Bang as Bang
                FROM CuaHang AS ch
                INNER JOIN Fact2 AS f2 ON f2.Ma_CH = ch.Ma_CH
                INNER JOIN ThoiGian as tg ON tg.Ma_TG = f2.Ma_TG ${filter}          
                INNER JOIN VanPhongDD AS vp ON vp.Ma_TP = f2.Ma_TP
                INNER JOIN Fact1 AS f1 ON f1.Ma_CH = ch.Ma_CH 
            WHERE f1.Ma_Don IS NOT NULL AND f1.Ma_KH IS NOT NULL AND f1.Ma_MH IS NOT NULL   
        `
        console.log("Query 3",query)
        const result = await sql.query(query)
        res.json(result.recordset)
    } catch (err) {
        // ... error checks
    }
})
/* XONG
4. Tìm địa chỉ văn phòng đại diện với tên thành phố, bang của tất cả các cửa hàng lưu kho một mặt hàng nào đó với số lượng trên mức cụ thể.
*/
router.post('/4', async (req, res, next) => {
    try {
        let {Ngay, Thang, Quy, Nam, Ma_MH, SoLuong} = req.body

        let filter = ""
        if (Ngay) filter = ` ${filter} AND tg.Ngay = ${Ngay} `
        if (Thang) filter = ` ${filter} AND tg.Thang = ${Thang} `
        if (Quy) filter = ` ${filter} AND tg.Quy = ${Quy} `
        if (Nam) filter = ` ${filter} AND tg.Nam = ${Nam} `
   
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(`mssql://sa:12345678@${IP}/DW`)
        let query = `
            SELECT DISTINCT vp.Ma_TP AS Ma_TP, vp.Ten_TP AS Ten_TP, vp.Bang AS Bang
                FROM VanPhongDD AS vp
                INNER JOIN Fact2 AS f2 ON f2.Ma_TP = vp.Ma_TP
                INNER JOIN ThoiGian as tg ON tg.Ma_TG = f2.Ma_TG ${filter}          
            WHERE f2.Ma_MH = ${Ma_MH} AND f2.SoLuong > ${SoLuong}            
        `
        console.log("Query 4", query)
        const result = await sql.query(query)
        res.json(result.recordset)
    } catch (err) {
        // ... error checks
    }
})
/* XONG
5. Với mỗi một đơn đặt hàng của khách, liệt kê các mặt hàng được đặt cùng với mô tả,
 mã cửa hàng, tên thành phố và các cửa hàng có bán mặt hàng đó.
*/
router.post('/5', async (req, res, next) => {
    try {
        let {Ngay, Thang, Quy, Nam, Ma_Don} = req.body

        let filter = ""
        if (Ngay) filter = ` ${filter} AND tg.Ngay = ${Ngay} `
        if (Thang) filter = ` ${filter} AND tg.Thang = ${Thang} `
        if (Quy) filter = ` ${filter} AND tg.Quy = ${Quy} `
        if (Nam) filter = ` ${filter} AND tg.Nam = ${Nam} `
        
        
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(`mssql://sa:12345678@${IP}/DW`)
        let query = `
        SELECT DISTINCT mh.Ma_MH AS Ma_MH, mh.MoTa AS MoTa,ch.Ma_CH AS Ma_CH, vp.Ten_TP AS Ten_TP
            FROM MatHang AS mh 
            INNER JOIN Fact1 AS f1 ON f1.Ma_MH = mh.Ma_MH AND f1.Ma_Don = ${Ma_Don}
            INNER JOIN ThoiGian as tg ON tg.Ma_TG = f1.Ma_TG ${filter}          
            INNER JOIN CuaHang AS ch ON  ch.Ma_CH = f1.Ma_CH
            INNER JOIN VanPhongDD AS vp ON vp.Ma_TP = ch.Ma_TP       
            
        `
        console.log("Query 5", query)
        const result = await sql.query(query)
        res.json(result.recordset)
    } catch (err) {
        // ... error checks
    }
})
/* Xong
6. Tìm thành phố và bang mà một khách hàng nào đó sinh sống
*/
router.post('/6', async (req, res, next) => {
    try {
        let {Ngay, Thang, Quy, Nam, Ma_KH} = req.body

        let filter = ""
        if (Ngay) filter = ` ${filter} AND tg.Ngay = ${Ngay} `
        if (Thang) filter = ` ${filter} AND tg.Thang = ${Thang} `
        if (Quy) filter = ` ${filter} AND tg.Quy = ${Quy} `
        if (Nam) filter = ` ${filter} AND tg.Nam = ${Nam} `
        
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(`mssql://sa:12345678@${IP}/DW`)
        let query = `
        SELECT DISTINCT vp.Ma_TP AS Ma_TP, vp.Ten_TP AS Ten_TP, vp.Bang AS Bang 
            FROM VanPhongDD AS vp 
            INNER JOIN KhachHang AS kh ON kh.Ma_TP = vp.Ma_TP AND kh.Ma_KH = ${Ma_KH}
            INNER JOIN Fact1 as f1 ON f1.Ma_KH = kh.Ma_KH
            INNER JOIN ThoiGian as tg ON tg.Ma_TG = f1.Ma_TG ${filter}          
        `
        console.log("Query 6", query)
        const result = await sql.query(query)
        res.json(result.recordset)
    } catch (err) {
        // ... error checks
    }
})
/* query like faild
7. Tìm mức độ tồn kho của một mặt hàng cụ thể tại tất cả các cửa hàng 
    ở một thành phố cụ thể nào đó
*/
router.post('/7', async (req, res, next) => {
    try {
        let {Ngay, Thang, Quy, Nam, Ma_MH, Ten_TP} = req.body

        let filter = ""
        if (Ngay) filter = ` ${filter} AND tg.Ngay = ${Ngay} `
        if (Thang) filter = ` ${filter} AND tg.Thang = ${Thang} `
        if (Quy) filter = ` ${filter} AND tg.Quy = ${Quy} `
        if (Nam) filter = ` ${filter} AND tg.Nam = ${Nam} `
       
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(`mssql://sa:12345678@${IP}/DW`)
        let query = `
            SELECT mh.Ma_MH as Ma_MH, SUM(f2.SoLuong) as SoLuong
                FROM MatHang as mh
                INNER JOIN Fact2 as f2 ON f2.Ma_MH = mh.Ma_MH 
                INNER JOIN ThoiGian as tg ON tg.Ma_TG = f2.Ma_TG ${filter}          
                INNER JOIN VanPhongDD as vp ON f2.Ma_TP = vp.Ma_TP AND vp.Ten_TP LIKE %${Ten_TP}%
            GROUP BY mh.Ma_MH
            HAVING mh.Ma_MH = ${Ma_MH}
        `
        console.log('Query 7', query)
        const result = await sql.query(query)
        res.json(result.recordset)
    } catch (err) {
        // ... error checks
    }
})
/*
8. Tìm các mặt hàng, số lượng đặt, khách hàng, cửa hàng và thành phố của một đơn đặt hàng.
*/
router.post('/8', async (req, res, next) => {
    try {
        let {Ngay, Thang, Quy, Nam, Ma_Don} = req.body

        let filter = ""
        if (Ngay) filter = ` ${filter} AND tg.Ngay = ${Ngay} `
        if (Thang) filter = ` ${filter} AND tg.Thang = ${Thang} `
        if (Quy) filter = ` ${filter} AND tg.Quy = ${Quy} `
        if (Nam) filter = ` ${filter} AND tg.Nam = ${Nam} `

        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(`mssql://sa:12345678@${IP}/DW`)
        let query = `
        SELECT DISTINCT mh.Ma_MH AS Ma_MH, f1.SoLuongDat AS SoLuongDat, kh.TenKH AS TenKH, ch.Ma_CH AS Ma_CH, vp.Ten_TP AS Ten_TP 
            FROM Fact1 AS f1
            INNER JOIN ThoiGian as tg ON tg.Ma_TG = f1.Ma_TG ${filter}          
            INNER JOIN CuaHang AS ch ON ch.Ma_CH = f1.Ma_CH
            INNER JOIN MatHang AS mn ON mn.Ma_MH = f1.Ma_MH
            INNER JOIN MatHang AS mh ON mh.Ma_MH = f1.Ma_MH
            INNER JOIN KhachHang AS kh ON kh.Ma_KH = f1.Ma_KH
            INNER JOIN VanPhongDD AS vp ON vp.Ma_TP = ch.Ma_TP
	    WHERE f1.Ma_Don = ${Ma_Don}
        `
        console.log("Query 8", query)
        const result = await sql.query(query)
        res.json(result.recordset)
    } catch (err) {
        // ... error checks
    }
})
/*
9. Tìm các khách hàng du lịch, khách hàng đặt theo đường bưu điện và
khách hàng thuộc cả hai loại
*/
router.post('/9', async (req, res, next) => {
    try {
        let {Ngay, Thang, Quy, Nam, Ma_Don} = req.body

        let filter = ""
        if (Ngay) filter = ` ${filter} AND tg.Ngay = ${Ngay} `
        if (Thang) filter = ` ${filter} AND tg.Thang = ${Thang} `
        if (Quy) filter = ` ${filter} AND tg.Quy = ${Quy} `
        if (Nam) filter = ` ${filter} AND tg.Nam = ${Nam} `

        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(`mssql://sa:12345678@${IP}/DW`)
        let query = `
            SELECT * FROM KhachHang
        `
        console.log("Query 9",query)
        const result = await sql.query(query)
        res.json(result.recordset)
    } catch (err) {
        // ... error checks
    }
})
module.exports = router
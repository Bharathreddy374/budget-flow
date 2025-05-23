const express= require("express");
const router =express.Router();
const {protect} =require("../middleware/authMiddleware");

const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel

}=require("../controllers/incomeController");



router.post("/add",protect,addIncome);
router.delete("/:id",protect,deleteIncome);
router.get("/download",protect,downloadIncomeExcel);
router.get("/get",protect,getAllIncome);



module.exports = router;
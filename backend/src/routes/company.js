import express from "express"

import { createCompany, getAllCompanies, getCompanyById, updateCompany } from "../controllers/companyController.js"

const router = express.Router()

router.get('/',getAllCompanies)
router.get('/:id', getCompanyById)
router.post('/',createCompany)
router.put('/:id', updateCompany)

export default router
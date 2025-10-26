import express from "express"

import { createCustomer, getCustomersByCompany,getAllCustomers,getCustomerById } from "../controllers/customerController.js"

const router = express.Router()

router.get('/',getAllCustomers)
router.post('/',createCustomer)
router.get('/company/:companyId',getCustomersByCompany)
router.get('/:id',getCustomerById)

export default router;

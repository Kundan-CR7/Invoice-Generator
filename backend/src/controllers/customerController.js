import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllCustomers = async(req,res) => {
    try{
        const customers = await prisma.customer.findMany({
            orderBy : {createdAt : "desc"},
            include : {company:true}
        })
        res.json(customers)
    }catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

export const createCustomer = async (req, res) => {
    try {
        const { companyId, name, email, phone, address } = req.body;
        if (!companyId || !name)
        return res.status(400).json({ error: "Company ID and name are required" });

        const customer = await prisma.customer.create({
        data: { companyId, name, email, phone, address },
        include: { company: true }
        });

        res.status(201).json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

export const getCustomersByCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        if (!companyId) {
            return res.status(400).json({ error: "Company ID is required" });
        }
        const customers = await prisma.customer.findMany({
        where: { companyId },
        include:{company:true},
        orderBy: { createdAt: "desc" },
        });
        res.json(customers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
export const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await prisma.customer.findUnique({
            where: { id },
            include: { company: true },
        });

        if (!customer) return res.status(404).json({ error: "Customer not found" });
        res.json(customer);
    } catch (error) {
        console.error("Error fetching customer:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
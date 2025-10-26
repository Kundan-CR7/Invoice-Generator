import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCompany = async(req,res) => {
    try {
    const { name, address, email, phone, gstNumber, logoUrl } = req.body;
    if (!name) return res.status(400).json({ error: "Company name is required" });

    const company = await prisma.company.create({
        data: { name, address, email, phone, gstNumber, logoUrl },
    });

    res.status(201).json(company);
    } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ error: "Internal server error" });
    }
}
export const getAllCompanies = async (req, res) => {
    try {
        const companies = await prisma.company.findMany({
        orderBy: { createdAt: "desc" },
        });
        res.json(companies);
    } catch (error) {
        console.error("Error fetching companies:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await prisma.company.findUnique({
            where: { id }
        });
        
        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }
        
        res.json(company);
    } catch (error) {
        console.error("Error fetching company:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, address, gstNumber, logoUrl } = req.body;
        
        const company = await prisma.company.update({
            where: { id },
            data: {
                name,
                email,
                phone,
                address,
                gstNumber,
                logoUrl
            }
        });
        
        res.json(company);
    } catch (error) {
        console.error("Error updating company:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
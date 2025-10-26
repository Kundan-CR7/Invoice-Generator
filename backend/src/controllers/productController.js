import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
    try {
        const { companyId, name, price, description } = req.body;
        if (!companyId || !name || price == null)
        return res.status(400).json({ error: "Company ID, name, and price are required" });

        const product = await prisma.product.create({
            data: { companyId, name, price:parseFloat(price), description },
        });

        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

export const getProductsByCompany = async (req, res) => {
    try {
      const { companyId } = req.params;
      const products = await prisma.product.findMany({
          where: { companyId },
          orderBy: { createdAt: "desc" },
      });
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
};
export const getAllProducts = async (req, res) => {
    try{
      const products = await prisma.product.findMany({
      include: { company: true },
      orderBy: { createdAt: "desc" },
      });
      res.json(products);
    }catch(error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await prisma.product.findUnique({
        where: { id },
        include: { company: true },
      });

      if (!product) return res.status(404).json({ error: "Product not found" });

      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
};


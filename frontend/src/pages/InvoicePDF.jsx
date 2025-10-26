import { useEffect, useState } from "react";
import { api } from "../components/services/api";

export default function Invoices() {
  const [companies, setCompanies] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    fetchCompanies();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCompany) fetchCustomers(selectedCompany);
    else setCustomers([]);
  }, [selectedCompany]);

  const fetchCompanies = async () => {
    const res = await api.get("/companies");
    setCompanies(res.data);
  };

  const fetchCustomers = async (companyId) => {
    const res = await api.get(`/customers/${companyId}`);
    setCustomers(res.data);
  };

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const addItem = () => {
    setSelectedItems([
      ...selectedItems,
      { productId: "", qty: 1, price: 0, name: "" },
    ]);
  };

  const updateItem = (index, field, value) => {
    const items = [...selectedItems];
    items[index][field] = value;

    // If productId changes, update name & price
    if (field === "productId") {
      const product = products.find((p) => p.id === parseInt(value));
      if (product) {
        items[index].name = product.name;
        items[index].price = product.price;
      }
    }
    setSelectedItems(items);
  };

  const removeItem = (index) => {
    const items = [...selectedItems];
    items.splice(index, 1);
    setSelectedItems(items);
  };

  const createInvoice = async () => {
    if (!selectedCompany || !selectedCustomer || selectedItems.length === 0) {
      return alert("Company, Customer and at least one product are required");
    }

    const payload = {
      companyId: selectedCompany,
      customerId: selectedCustomer,
      items: selectedItems.map((i) => ({
        name: i.name,
        price: parseFloat(i.price),
        qty: parseInt(i.qty),
      })),
      taxRate: parseFloat(taxRate),
      discount: parseFloat(discount),
      dueDate,
    };

    try {
      const res = await api.post("/invoices", payload);
      alert(`Invoice ${res.data.invoice.number} created successfully`);
      // Reset form
      setSelectedItems([]);
      setSelectedCompany("");
      setSelectedCustomer("");
      setTaxRate(0);
      setDiscount(0);
      setDueDate("");
    } catch (err) {
      console.error(err);
      alert("Failed to create invoice");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>

      <div className="flex gap-2 mb-4">
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="border p-1"
        >
          <option value="">Select Company</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          className="border p-1"
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Tax %"
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
          className="border p-1 w-24"
        />
        <input
          type="number"
          placeholder="Discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="border p-1 w-24"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-1"
        />
      </div>

      <h2 className="font-semibold mb-2">Products</h2>
      {selectedItems.map((item, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <select
            value={item.productId}
            onChange={(e) => updateItem(index, "productId", e.target.value)}
            className="border p-1"
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} - ₹{p.price}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) => updateItem(index, "qty", e.target.value)}
            className="border p-1 w-16"
          />
          <span className="flex items-center">₹{item.price * item.qty}</span>
          <button
            onClick={() => removeItem(index)}
            className="bg-red-500 text-white px-2 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={addItem}
        className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
      >
        Add Product
      </button>

      <div className="mt-4">
        <button
          onClick={createInvoice}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Invoice
        </button>
      </div>
    </div>
  );
}

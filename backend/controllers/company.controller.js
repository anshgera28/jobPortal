import { Company } from "../models/company.model.js";
export const registerCompany = async (req, res) => {
    try {
        const {companyName} = req.body;
        if(!companyName) {
            return res.status(400).json({ message: "Company name is required", success: false });
        }
        let company = await Company.findOne({ name: companyName });
        if(company) {
            return res.status(400).json({ message: "Company already exists", success: false });
        };
        company = await Company.create({ name: companyName, userId: req.id });
        return res.status(200).json({ message: "Company registered successfully", success: true, company });
    } catch (error) {
        console.log(error);

    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const company = await Company.find({ userId });
        if(!company) {
            return res.status(404).json({ message: "Company not found", success: false });
        };
        return res.status(200).json({ message: "Company found successfully", success: true, company });
    } catch (error) {
        console.log(error);
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company) {
            return res.status(404).json({ message: "Company not found", success: false });
        };
        return res.status(200).json({ message: "Company found successfully", success: true, company });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message });
    }
}

export const updateCompany = async (req, res) => {
    try {
        const {name, description, location, website, logo} = req.body;
        const file = req.file;

        // cloudinary ayega

        const updateData = {
            name,
            description,
            location,
            website,
        };
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if(!company) {
            return res.status(404).json({ message: "Company not found", success: false });
        };
        return res.status(200).json({ message: "Company updated successfully", success: true, company });


    }catch (error) {
        console.log(error);
    }
}

export const applyJob = async (req, res) => {
    try{

    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message });
    }
}
    
const checkBodyCheck = (req, res, next) => {
    const { first_name, last_name, email, mobile_number } = req.body;
    if (!first_name || !last_name || !email || !mobile_number) {
        return res.status(400).send({
            success: false,
            message: "All fields are required"
        })
    }
    next();
};


const updateBodyCheck = (req, res, next) => {
    const { contact_id, email, mobile_number } = req.body;
    if (!contact_id || !email || !mobile_number) {
        return res.status(400).send({
            success: false,
            message: "All fields are required"
        })
    }
    next();
}

const checkDataStore = (req, res, next) => {
    const { data_store } = req.body;
    if (!data_store) {
        return res.status(400).send({
            success: false,
            message: "All fields are required"
        })
    }
    if(data_store !== "CRM" && data_store !== "DATABASE"){
        return res.status(400).send({
            success: false,
            message: "Data store should be CRM or DATABASE"
        })
    }
    next();
}



module.exports = {
    checkBodyCheck,
    updateBodyCheck,
    checkDataStore
}



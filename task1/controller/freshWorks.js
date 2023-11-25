const axios = require('axios');

const baseUrl = process.env.FRESHWORKS_API;
const apiKey = process.env.FRESHWORKS_API_KEY;

const getContactFromFreshWorks = async (req, res) => {
    try {
        const { contact_id } = req.body;
        const resp = await axios.get(`https://${baseUrl}/crm/sales/api/contacts/`+contact_id,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token token=${apiKey}`
            }
        });
        if(resp.status === 200){
            return res.status(200).send({
                success: true,
                message: "Contact found",
                contact: resp.data.contact
            })
        }
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    } catch (err) {
        console.log(err)
        const message = err.response.data.errors.message[0]
        return res.status(500).send({
            success: false,
            message
        })

    }
};

const createContactFromFreshWorks = async (req, res) => {
    try{
        const {first_name, last_name, email, mobile_number} = req.body;
        const resp = await axios.post(`https://${baseUrl}/crm/sales/api/contacts`,{
                "contact": {
                    "first_name": first_name,
                    "last_name": last_name,
                    "email":email,
                    "mobile_number": mobile_number,
                }
        },{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token token=${apiKey}`
            }
        })


        if(resp.status === 200){
            return res.status(200).send({
                success: true,
                message: "Contact created successfully",
                contact_id: resp.data.contact.id
            })
        }
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })


    }catch(err){
        const message = err.response.data.errors.message[0]
        return res.status(500).send({
            success: false,
            message
        })
}
}

const updateContactControllerFromFreshWorks = async (req, res) => {
    try{
        const {contact_id, email, mobile_number} = req.body;
        
        const resp = await axios.put(`https://${baseUrl}/crm/sales/api/contacts/${contact_id}`,{
                "contact": {
                    "email":email,
                    "mobile_number": mobile_number,
                }
        },{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token token=${apiKey}`
            }
        })

        if(resp.status === 200){
            return res.status(200).send({
                success: true,
                message: "Contact updated successfully",
                contact_id: resp.data.contact.id
            })
        }

        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }catch(err){
        const message = err.response.data.errors.message[0]
        console.log(message)
        return res.status(500).send({
            success: false,
            message
        })
    }
}

const deleteContactControllerFromFreshWorks = async (req, res) => {
    try{
        const {contact_id} = req.body;
        const resp = await axios.delete(`https://${baseUrl}/crm/sales/api/contacts/${contact_id}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token token=${apiKey}`
            }
        })

        if(resp.status === 200){
            return res.status(200).send({
                success: true,
                message: "Contact deleted successfully",
            })
        }

        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })

    }catch(err){
        const message = err.response.data.errors.message[0]
        return res.status(500).send({
            success: false,
            message
        })
    }
}

module.exports = {
    getContactFromFreshWorks,
    createContactFromFreshWorks,
    updateContactControllerFromFreshWorks,
    deleteContactControllerFromFreshWorks
}



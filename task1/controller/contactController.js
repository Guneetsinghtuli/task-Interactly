const Contact = require('../models/contact')

const {getContactFromFreshWorks,createContactFromFreshWorks,updateContactControllerFromFreshWorks,deleteContactControllerFromFreshWorks} = require('./freshWorks')

const getContactController = async (req, res) => {
    try{

        const {contact_id,data_store} = req.body;
        if(data_store === "CRM"){
            return getContactFromFreshWorks(req,res)
        }
        const contact = await Contact.findByPk(contact_id)
        if(!contact){
            return res.status(404).send({
                success: false,
                message: "Id does not exist"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Contact found",
            contact
        })


    }catch(err){
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const createContactController = async (req, res) => {
    try{
        const {first_name, last_name, email, mobile_number,data_store} = req.body;
        if(data_store === "CRM"){
            return createContactFromFreshWorks(req,res)
        }
        const contact = await Contact.create({
            first_name,
            last_name,
            email,
            mobile_number
        })
        return res.status(200).send({
            success: true,
            message: "Contact created successfully",
            contact_id: contact.get('id')
        })

    }catch(err){
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })

    }
}

const updateContactController = async (req, res) => {
    try{
        const {contact_id, email, mobile_number,data_store} = req.body;
        if(data_store === "CRM"){
            return updateContactControllerFromFreshWorks(req,res)
        }
        const foundContact = await Contact.findByPk(contact_id)
        if(!foundContact){
            return res.status(404).send({
                success: false,
                message: "Contact not found"
            })
        }

        // Change the contact details
        foundContact.email = email;
        foundContact.mobile_number = mobile_number;
        await foundContact.save();

        return res.status(200).send({
            success: true,
            message: "Contact updated successfully",
            contact_id: foundContact.get('id')
        })

    }catch(err){
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })

    }
}

const deleteContactController = async (req, res) => {
    try{
        const {contact_id,data_store} = req.body;
        if(data_store === "CRM"){
            return deleteContactControllerFromFreshWorks(req,res)
        }
        if(!contact_id){
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            })
        }

        const foundContact = await Contact.findByPk(contact_id)
        if(!foundContact){
            return res.status(404).send({
                success: false,
                message: "Contact not found"
            })
        }

        await foundContact.destroy();

        return res.status(200).send({
            success: true,
            message: "Contact deleted successfully",
            contact_id: foundContact.get('id')
        })

    }catch(err){
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })

    }

}

module.exports = {
    getContactController,
    createContactController,
    updateContactController,
    deleteContactController
}
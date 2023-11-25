const express = require("express");

const contactRouter = express.Router();
const {getContactController, createContactController,updateContactController,deleteContactController} = require('../controller/contactController')

const {checkBodyCheck,updateBodyCheck,checkDataStore} = require('../middleware/contactMiddleware')

contactRouter.get("/getContact", checkDataStore ,getContactController);

contactRouter.post("/createContact",checkBodyCheck,checkDataStore ,createContactController);

contactRouter.post("/updateContact", updateBodyCheck,checkDataStore ,updateContactController);

contactRouter.post("/deleteContact", checkDataStore,deleteContactController);

module.exports = contactRouter;

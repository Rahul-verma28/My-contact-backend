const asyncHandler = require('express-async-handler');
const Contacts = require('../models/contactModel');

//@desc get all contact
//@route get /api/contact
//@access pvivate
const getContacts = async (req, res) => {
    const contacts = await Contacts.find({user_id: req.user.id});
    res.status(200).json(contacts);
};

//@desc post a contact
//@route post /api/contact
//@access pvivate
const createContact = asyncHandler (async (req, res) => {
    const {name, email, phone} = req.body;
    
    console.log(req.body);
    if(!name || !email || !phone ){
        res.status(400);
        // json({ msg: "Please enter all fields"});
        throw new Error("please fill out all the field");
    }

    const contact = await Contacts.create({
        name, email, phone, user_id: req.user.id
    });
    
    res.status(201).json(contact);
})

//@desc Get Contact id
//@route Get Contact id- /api/contact/id
//@access pvivate
const getContact = asyncHandler (async (req, res) => {
    const contact = await Contacts.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
})

//@desc Update all contact
//@route Update /api/contact/id
//@access pvivate
const updateContact = asyncHandler (async (req, res) => {
    const contact = await Contacts.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error('You are not authorized to update this contact');
    }
    const updatedConact = await Contacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(200).json(updatedConact)
})

//@desc delete all contact
//@route delete /api/contact/id
//@access pvivate
const deleteContact = asyncHandler (async (req, res) => {
    const contact = await Contacts.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error('You are not authorized to update this contact');
    }

    await contact.deleteOne({_id: req.params.id});

    res.status(200).json(contact)
})

module.exports = { getContacts, getContact, createContact, deleteContact, updateContact};
import { trusted } from "mongoose";
import Users from "../models/user.model.js";

//Create
export const createUser = async(req,res,next)=>{
    try{
        const USER = await Users.create(req.body)
        res.status(201).json(USER)
    }
    catch(error){
        res.status(400).json(error)
    }
}
//Read
export const getAllUsers = async(req,res,next)=>{
    try{
        const USERS= await Users.find()
        res.status(200).json(USERS)
    }
    catch(error){
        res.status(400).json(error)
    }
}

export const getUserById = async(req,res,next)=>{
    const {id} = req.params
    try{
        const USER = await Users.findById(id)
        res.status(200).json(USER)
    }
    catch(error){
        res.status(400).json(error)
    }
}
//Update
export const updateUserById = async(req,res,next)=>{
    const {id} = req.params
    const options = {
        new:true,
        runValidators:true
    }
    try{
        const UPDATED_USER = await Users.findByIdAndUpdate(id,req.body,options)
        res.status(200).json(UPDATED_USER)
    }
    catch(error){
        res.status(400).json(error)
    }
}
//Delete
export const deleteUserById = async(req,res,next)=>{
    const {id} = req.params
    try{
        const DELETED_USER = await Users.findByIdAndDelete(id)
        res.status(200).json(DELETED_USER)
    }
    catch(error){
        res.status(400).json(error)
    }
}
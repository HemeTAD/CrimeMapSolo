import {Router} from "express"
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from "../controllers/user.controller.js"


const UserRouter = Router()
//setting default browser page for project("/")
UserRouter.route("/")
.post(createUser)
.get(getAllUsers)

UserRouter.route("/:id")
.get(getUserById)
.delete(deleteUserById)
.put(updateUserById)

export default UserRouter
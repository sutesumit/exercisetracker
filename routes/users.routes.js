import express from "express"
import { User, Exercise } from "../model/userlogs.model.js"
import { postUser, postExercise, getAllUsers, getUserExercises } from "../controllers/users.controllers.js"

const router = express.Router()

router.post('/', postUser)

router.get('/', getAllUsers)

router.post('/:_id/exercises', postExercise)

router.get('/:_id/logs', getUserExercises)
  
export default router
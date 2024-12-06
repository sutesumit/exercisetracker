import { User, Exercise } from "../model/userlogs.model.js"

export const postUser = async (req, res) => {
        try {
          const { username } = req.body
          const newUsername = new User({username})
          const user = await newUsername.save()
          res.status(201).json({
            username: user.username,
            _id: user._id
          })
        } catch (error) {
          console.error(`Failed to add new log.`)
          res.status(500).json({success: false, message: `Somethign went wrong: ${error.message}`})
        }
      }

export const getAllUsers = async (req, res) => {
        try {
          const users = await User.find({}).select("_id username")
          if(!users){
            res.send("No users yet!")
          } else {
            res.json(users)
          }
        } catch (error) {
          console.log(`Failed to fetch users.`)
          res.status(500).json({success: false, message: `Error in connection: ${error.message}`})
        }
      }

export const postExercise = async (req, res) => {   
    try {
        const userId = req.params._id
        const user = await User.findById(userId)
        if (!user){
            res.status(400).json({success: false, message: `User not found`})
        } else {
            const { description, duration, date } = req.body
            const exercise = { userId, description, duration, date : date ? new Date(date): new Date() }
            const newExercise = new Exercise(exercise)
            await newExercise.save()

            res.status(201).json({
                username: user.username,
                description: exercise.description,
                duration: +exercise.duration,
                date: new Date(exercise.date).toDateString(),
                _id : exercise.userId,
                
            })

        }
        
        } catch (error) {
        console.error(`Failed to create new exercise.`)
        res.status(404).json({success: false, message: `Invalid Entry: ${error.message}`})
        }
  }

export const getUserExercises = async (req, res) => {
    const userId = req.params._id
    const { from, to, limit} = req.query
    const filter = { userId  }
    const dateObj = {}

    if (from){
        dateObj["$gte"] = new Date(from)
    }
    if (to){
        dateObj["$lte"] = new Date(to)
    }

    if ( from || to ){
        filter.date = dateObj
    }

    
    try {
        const user = await User.findById(userId)
        if (!user){
            res.status(404).json({success: false, message: `User not found!`})
        } else {

            const exercises = await Exercise.find(filter).select(`description duration date -_id`).limit(+limit || 500)

            const log  = exercises.map( e => ({
                description: e.description,
                duration: +e.duration,
                date: e.date.toDateString()
            }))

            res.status(200).json({
                username: user.username,
                count: exercises.length,
                _id: userId,
                log
            })

        }
        
    } catch (error) {
        console.error(`Failed in fetching the logs.`)
    }
}
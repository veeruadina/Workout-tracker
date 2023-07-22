const express = require("express");
const router = express.Router();
const Exercise = require("../models/exercise");

router.get('/',(req,res)=>{
Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.post('/add' , ( req , res ) => {
    let username = req.body.username;
    let description = req.body.description;
    let duration = Number(req.body.duration);
    let date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch((err) => res.status(400).json('Error: ' + err))
});

router.get('/:id' , ( req , res ) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id' , ( req , res ) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id' , (req , res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
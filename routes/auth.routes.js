const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/user')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'мыло херня').isEmail(),
        check('password', 'больше 6 напиши').isLength({ min: 6 })
    ], 
    async(req, res) => {

    try {
        
        const errors =  validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'случилась параша'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if (candidate) {
            return res.status(400).json({message: 'Совсем склерозник чтоль ты уже тут зареган, иди логинься'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})


        await user.save()

        res.status(201).json({message: 'Добро пожаловать черт'})

    } catch (e) {
        res.status(500).json({ message: 'всему пизда'})
    }
})

// /api/auth/login
router.post(
    '/login', 
    [
        check('email', 'мыло херня напиши правильный').normalizeEmail().isEmail(),
        check('password', 'вводи сикрет свой').exists()
    ], 
    async(req, res) => {
    try {
        const errors =  validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json ({
                errors: errors.array(),
                message: 'случилась параша при входе'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({message: 'тебя тут нет'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: 'параша твой пароль'})
        }

        const token = jwt.sign(
            { userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.json({ token, userId: user.id})

    } catch (e) {
        res.status(500).json({ message: 'всему пизда'})
    }
})

module.exports = router
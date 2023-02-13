const express = require('express');
const fs = require('fs');
const projectModel = require('../models/project.js');
const projectRouter = express.Router();
const nodemailer = require('nodemailer');
const loginModel = require('../models/login');
const authguard = require('../services/authguard');
const multer = require('../services/multer');
require('dotenv').config();
// liste des librairies et intergiciels utilisés : express, nodemailer, authguard, multer

// 1. route pour envoyer les mails
// 1. A. accès au smtp de l'école
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
    },
});

// 1.B. route pour formulaire de contact
projectRouter.post('/sendMail', async (req, res) => {
    try {
        let info = await transporter.sendMail({
            from: req.body.mail,
            to: "fabienwalle13@gmail.com",
            subject: req.body.name,
            text: `Mail de l'émetteur:\n\n${(req.body.mail)}\n\nMessage de l'émetteur:\n\n${(req.body.message)}`,
        });
        res.redirect('/projects')
    } catch (err) {
        res.send(err)
    }
})

// 2. route pour afficher la liste des projets
projectRouter.get('/', async (req, res) => {
    try {
        let projects = await projectModel.find();
        res.render('projects.twig', {
            projects: projects
        })
    } catch (err) {
        res.send(err)
    }
})

// 3.route pour effectuer le delete de projet
projectRouter.get('/deleteProject/:id', authguard, async (req, res) => {
    try {
        let project = await projectModel.findById(req.params.id)
        fs.unlinkSync('./assets/uploads/' + project.image)
        await projectModel.deleteOne({ _id: req.params.id });
        res.redirect('/updateProject')
    } catch (err) {
        res.send(err)
    }
})

// 4. route pour ajouter un nouveau projet
projectRouter.post('/addProject', authguard, multer.single('image'), async (req, res) => {
    try {
        req.body.image = req.file.filename
        let project = new projectModel(req.body);
        project.save();
        res.redirect('updateProject')
    } catch (err) {
        res.send(err)
    }
})

// 5. routes de mise à jour des projets
// 5. A. route pour se connecter au formulaire d'ajout
projectRouter.get('/updateProject/:id', async (req, res) => {
    try {
        res.render('updateProjectForm.twig', {
            projectId: req.params.id
        })
    } catch (err) {
        res.send(err)
    }
})

// 5. B. route pour mettre à jour le projet
projectRouter.post('/updateProject/:id', authguard, multer.single('image'), async (req, res) => {
    try {
        let project = await projectModel.findById(req.params.id)
        req.body.image = req.file.filename;
        fs.unlinkSync('./assets/uploads/' + project.image)
        await projectModel.updateOne({ _id: req.params.id }, req.body);
        res.redirect('/updateProject');
    } catch (err) {
        res.send(err)
    }
})

// 5. C. route pour visualiser la liste des projets enregistrés (màj + ajout projet)
projectRouter.get('/updateProject', authguard, async (req, res) => {
    try {
        let projects = await projectModel.find();
        res.render('updateProjectForm.twig', {
            projects: projects
        })
    } catch (err) {
        res.send(err)
    }
})


// 6. routes du login
// 6. A. routes pour accéder à la page de login
projectRouter.get('/login', async (req, res) => {
    try {
        res.render('login.twig')
    } catch (err) {
        res.send(err)
    }
})

// 6. B. route pour valider les login mdp rentrés dans le formulaire
projectRouter.post('/login', async (req, res) => {
    try {
        let user = await loginModel.findOne({ login: req.body.login, password: req.body.password })
        if (user) {
            req.session.userId = user._id
            res.redirect('/updateProject')
        } else {
            res.redirect('/')
        }
    } catch (err) {
        res.send(err)
    }
})


module.exports = projectRouter;
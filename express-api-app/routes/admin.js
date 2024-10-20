const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const Project = require('../models/Project');

// Route to display form for adding a skill
router.get('/add-skill', (req, res) => {
  res.render('add-skill', { title: 'Add Skill' });
});

// Route to handle form submission for adding a skill
router.post('/add-skill', async (req, res) => {
  try {
    const { name, proficiency } = req.body;
    await Skill.create({ name, proficiency });
    res.redirect('/admin/add-skill');
  } catch (err) {
    res.status(500).send('Error adding skill: ' + err.message);
  }
});

// Route to handle form submission for adding a project
router.post('/add-project', async (req, res) => {
  console.log(req.body);  
  try {
    const { title, description, techStack, githubLink } = req.body;
    console.log('Tech Stack Received:', techStack);  
    const project = await Project.create({
      title,
      description,
      techStack: techStack.split(','), 
      githubLink
    });
    console.log('Project Created:', project);  
    res.redirect('/admin/add-project');
  } catch (err) {
    console.error('Failed to add project:', err);
    res.status(500).send('Error adding project: ' + err.message);
  }
});

module.exports = router;

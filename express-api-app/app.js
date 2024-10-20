require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Set Pug as the template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Import routes
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

// Use routes
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// Route for the root path
app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page', message: 'Projects and Skills listing for your Portfolio' });
});

// Admin Routes
app.get('/admin/add-project', (req, res) => {
  res.render('add-project', { title: 'Add Project' });
});

app.post('/admin/add-project', async (req, res) => {
  try {
    const { title, description, technologies } = req.body;
    await Project.create({ title, description, technologies: technologies.split(',') });
    res.redirect('/admin/add-project');
  } catch (err) {
    res.status(500).send('Error adding project');
  }
});

app.get('/admin/add-skill', (req, res) => {
  res.render('add-skill', { title: 'Add Skill' });
});

app.post('/admin/add-skill', async (req, res) => {
  try {
    const { name, level } = req.body;
    await Skill.create({ name, level });
    res.redirect('/admin/add-skill');
  } catch (err) {
    res.status(500).send('Error adding skill');
  }
});

// API Endpoints
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

// API Endpoints
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching skills' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

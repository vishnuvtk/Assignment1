const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [String],  
  githubLink: { type: String, required: false } 
});

module.exports = mongoose.model('Project', ProjectSchema);

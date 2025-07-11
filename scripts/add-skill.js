#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

async function addSkill() {
  console.log(colorize('🚀 Welcome to the Skill Manager!', 'cyan'))
  console.log(colorize('Let\'s add a new skill to your portfolio.\n', 'blue'))

  try {
    // Get skill details from user
    const name = await question(colorize('📝 Skill name: ', 'yellow'))
    if (!name.trim()) {
      throw new Error('Skill name is required!')
    }

    console.log(colorize('\n📂 Available categories:', 'blue'))
    console.log('  1. frontend')
    console.log('  2. backend') 
    console.log('  3. database')
    console.log('  4. devops')
    console.log('  5. other')

    const categoryChoice = await question(colorize('\n🎯 Select category (1-5): ', 'yellow'))
    const categories = ['frontend', 'backend', 'database', 'devops', 'other']
    const category = categories[parseInt(categoryChoice) - 1] || 'other'

    const proficiency = await question(colorize('📊 Proficiency level (0-100): ', 'yellow'))
    const proficiencyNum = Math.min(100, Math.max(0, parseInt(proficiency) || 50))

    const description = await question(colorize('📖 Short description: ', 'yellow'))
    
    // Auto-generate logo URL based on skill name
    const logoUrl = generateLogoUrl(name)
    
    const brandColor = await question(colorize('🎨 Brand color (hex, optional): ', 'yellow')) || generateBrandColor(category)

    // Load existing skills
    const skillsPath = path.join(__dirname, '../data/skills.json')
    let skillsData = { skills: [] }
    
    if (fs.existsSync(skillsPath)) {
      const content = fs.readFileSync(skillsPath, 'utf8')
      skillsData = JSON.parse(content)
    }

    // Create new skill object
    const newSkill = {
      name: name.trim(),
      category,
      proficiency: proficiencyNum,
      logoUrl,
      brandColor: brandColor.startsWith('#') ? brandColor : `#${brandColor}`,
      description: description.trim() || `${name} development and implementation`
    }

    // Check if skill already exists
    const existingSkill = skillsData.skills.find(s => 
      s.name.toLowerCase() === newSkill.name.toLowerCase()
    )

    if (existingSkill) {
      const update = await question(colorize('⚠️  Skill already exists. Update it? (y/n): ', 'yellow'))
      if (update.toLowerCase() === 'y') {
        Object.assign(existingSkill, newSkill)
        console.log(colorize('✅ Skill updated successfully!', 'green'))
      } else {
        console.log(colorize('❌ Operation cancelled.', 'red'))
        return
      }
    } else {
      skillsData.skills.push(newSkill)
      console.log(colorize('✅ Skill added successfully!', 'green'))
    }

    // Save updated skills
    fs.writeFileSync(skillsPath, JSON.stringify(skillsData, null, 2))
    
    console.log(colorize('\n📋 Skill Details:', 'cyan'))
    console.log(`  Name: ${newSkill.name}`)
    console.log(`  Category: ${newSkill.category}`)
    console.log(`  Proficiency: ${newSkill.proficiency}%`)
    console.log(`  Logo URL: ${newSkill.logoUrl}`)
    console.log(`  Brand Color: ${newSkill.brandColor}`)
    console.log(`  Description: ${newSkill.description}`)

    console.log(colorize('\n🎉 Portfolio updated! Your new skill will appear on the website.', 'green'))

  } catch (error) {
    console.error(colorize(`❌ Error: ${error.message}`, 'red'))
  } finally {
    rl.close()
  }
}

function generateLogoUrl(skillName) {
  // Clean skill name for URL
  const cleanName = skillName.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/js$/, 'javascript')
    .replace(/ts$/, 'typescript')

  // Common mappings
  const mappings = {
    'nextjs': 'nextjs',
    'react': 'react',
    'vue': 'vuejs', 
    'angular': 'angularjs',
    'node': 'nodejs',
    'express': 'express',
    'mongodb': 'mongodb',
    'postgresql': 'postgresql',
    'mysql': 'mysql',
    'python': 'python',
    'javascript': 'javascript',
    'typescript': 'typescript',
    'java': 'java',
    'cplusplus': 'cplusplus',
    'csharp': 'csharp',
    'go': 'go',
    'rust': 'rust',
    'php': 'php',
    'swift': 'swift',
    'kotlin': 'kotlin',
    'dart': 'dart',
    'flutter': 'flutter',
    'docker': 'docker',
    'kubernetes': 'kubernetes',
    'aws': 'amazonwebservices',
    'azure': 'azure',
    'gcp': 'googlecloud',
    'git': 'git',
    'github': 'github',
    'gitlab': 'gitlab',
    'figma': 'figma',
    'photoshop': 'photoshop',
    'illustrator': 'illustrator'
  }

  const iconName = mappings[cleanName] || cleanName
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`
}

function generateBrandColor(category) {
  const categoryColors = {
    'frontend': '#3B82F6',    // Blue
    'backend': '#10B981',     // Green  
    'database': '#8B5CF6',    // Purple
    'devops': '#F59E0B',      // Orange
    'other': '#6B7280'        // Gray
  }
  
  return categoryColors[category] || '#6B7280'
}

// Run the script
addSkill()
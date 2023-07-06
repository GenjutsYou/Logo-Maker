const fs = require('fs');
const inquirer = require('inquirer');
const { Triangle, Circle, Square } = require('./lib/shapes');

// Function to prompt the user for logo details
async function promptUser() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo:',
      validate: (input) => {
        if (input.length <= 3) {
          return true;
        }
        return 'Please enter up to three characters.';
      },
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hexadecimal):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hexadecimal):',
    },
  ]);

  const { text, textColor, shape, shapeColor } = answers;

  // Create the corresponding shape object
  let shapeObj;
  switch (shape) {
    case 'circle':
      shapeObj = new Circle();
      break;
    case 'triangle':
      shapeObj = new Triangle();
      break;
    case 'square':
      shapeObj = new Square();
      break;
    default:
      throw new Error('Invalid shape');
  }

  // Set the colors for the text and shape
  shapeObj.setColor(shapeColor);

  // Generate the SVG string
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    ${shapeObj.render()}
    <text x="150" y="100" fill="${textColor}" text-anchor="middle" dominant-baseline="central">${text}</text>
  </svg>`;

  // Save the SVG string to a file named 'logo.svg'
  fs.writeFileSync('logo.svg', svgString);

  console.log('Generated logo.svg');
}

// Invoke the promptUser function
promptUser();
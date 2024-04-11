const inquirer = require('inquirer');
var qr = require('qr-image');

/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/


const questions = [
    {
        type: 'input',
        name: 'url',
        message: "Enter url",
        validate(value) {
          const pass = value.match(
            /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/i,
          );
          if (pass) {
            return true;
          }
          return 'Please enter a valid url';
        },
    }
]

function make_QR(url) {
    var qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(require('fs').createWriteStream('qr_img_output.png'));
    
}

inquirer
  .prompt(questions)
  .then((answers) => {
    make_QR(answers.url)
});

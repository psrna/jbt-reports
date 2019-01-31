'use strict'

const fs = require('fs')
const Mustache = require('mustache');
const {Repository, Commit} = require('../repository.js');

let template = fs.readFileSync('./ui/templates/report.mst');


function generateReport(repos){

    let output = Mustache.render(template.toString(), {repos});
    fs.writeFile("./report.html", output, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The report file was saved!");
    }); 
    return output; 
}

module.exports.generateReport = generateReport;
#!/usr/bin/env node

'use strict'

const config = require('./config.json');
const {Repository, Commit} = require('./repository.js');
const Sprint = require('./sprint.js');


var argv = require('yargs')
    .usage('Usage: jbt-reports [options]')
    .option('sprint', {
      describe: 'Get reports since Sprint X',
      default: '0',
      defaultDescription: 'current sprint'
    })
    .help('help')
    .version()
    .argv;


var commitsSinceDate = new Sprint().getCurrentSprint().sprintStartDate;

if(argv.sprint > new Sprint().getFirstSprint().sprintNumber){
    commitsSinceDate = new Sprint().getSprint(argv.sprint).sprintStartDate;
}

var repos = new Array();

Promise.all(config.repositories.map(name => {
    var r = new Repository(name, commitsSinceDate);
    repos.push(r);
    return r.populate();
}
))
.then(data => {
    
    repos.forEach(element => {
        console.log('\n  ~~~~ ' + element.name + ' ~~~~ \n');
        element.getCommits().forEach(com => {
            console.log(com.messageHeadline);
        });
    });
})


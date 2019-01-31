#!/usr/bin/env node

'use strict'

const config = require('./config.json');
const { Repository, Commit } = require('./repository.js');
const Sprint = require('./sprint.js');
const Reporter = require('./ui/reporter.js');
let token = config.token;


let argv = require('yargs')
    .usage('Usage: jbt-reports [options]')
    .option('sprint', {
        describe: 'Get reports since Sprint X',
        default: '0',
        defaultDescription: 'current sprint'
    })
    .option('token', {
        describe: 'Your github access token',
    })
    .help('help')
    .version()
    .argv;


let commitsSinceDate = new Sprint().getCurrentSprint().sprintStartDate;

if (argv.sprint > new Sprint().getFirstSprint().sprintNumber) {
    commitsSinceDate = new Sprint().getSprint(argv.sprint).sprintStartDate;
}
if (argv.token) {
    token = argv.token;
}
module.exports.token = token;

let repos = new Array();
Promise.all(config.repositories.map(name => {
    let r = new Repository(name, commitsSinceDate);
    repos.push(r);
    return r.populate();
}
))
.then(data => {
    let json = JSON.stringify(repos);
    Reporter.generateReport(repos);

    // repos.forEach(element => {
    //     console.log('\n  ~~~~ ' + element.name + ' ~~~~ \n');
    //     element.getCommits().forEach(com => {
    //         console.log(com.messageHeadline);
    //     });
    // });
})
.catch(err => {
    console.log(err);
})


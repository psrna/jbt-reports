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
    repos.sort(compare);
    Reporter.generateReport(repos, argv.sprint == 0 ? new Sprint().getCurrentSprint().sprintNumer : argv.sprint);
})
.catch(err => {
    console.log(err);
})

function compare(repoA, repoB){
    const commitsCountA = repoA.getCommitsCount();
    const commitsCountB = repoB.getCommitsCount();

    let comparison = 0;
    if(commitsCountA > commitsCountB){
        comparison = -1;
    } else if(commitsCountA < commitsCountB){
        comparison = 1;
    }
    return comparison;
}

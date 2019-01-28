/**
 * Tool to fetch data from jbosstools github repositories
 */

const config = require('./config.json');
const {Repository, Commit} = require('./repository.js')

var commitsSinceDate = "2018-11-01T00:00:00Z";

var repos = new Array();

Promise.all(config.repositories.map(name => {
    var r = new Repository(name, commitsSinceDate);
    repos.push(r);
    return r.populate();
}
))
.then(data => {
    
    repos.forEach(element => {
        element.getCommits().forEach(com => {
            console.log(com.messageHeadline);
        });
    });
})


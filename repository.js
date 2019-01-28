'use strict'


const fetch = require('node-fetch');
const config = require('./config.json');

const query = `
query($repo: String!, $sinceDate: GitTimestamp!) {
    repository(owner: "jbosstools", name: $repo) {
        ...CommitsSince
    }
}
fragment CommitsSince on Repository {
    ref(qualifiedName: "master") {
      target {
        ... on Commit {
          history(since: $sinceDate) {
            totalCount
            edges {
              node {
                messageHeadline
                commitUrl
                committedDate
              }
            }
          }
        }
      }
    }
}`;


class Repository {


    constructor(name, sinceDate) {
        this.organization = 'jbosstools'
        this.name = name;
        this.commits = new Array();
        this.sinceDate = sinceDate;
    }

    getCommits() {
        return this.commits;
    }

    getCommitsCount() {
        return this.commits.length;
    }

    populate() {

        var repo = this.name;
        var sinceDate = this.sinceDate;

        var promise = fetch('https://api.github.com/graphql', {
            method: 'POST',
            body: JSON.stringify({
                query,
                variables: { repo, sinceDate }
            }),
            headers: {
                'Authorization': `Bearer ${config.token}`,
            },
        }).then(res => res.text())
            .then(body => {
                JSON.parse(body).data.repository.ref.target.history.edges.forEach(commit => {
                    this.getCommits().push(new Commit(commit.node.messageHeadline, commit.node.url, commit.node.committedDate));
                });
            })
            .catch(error => console.error(error))
        return promise;
    }
}

class Commit {

    constructor(messageHeadline, url, committedDate) {
        this.messageHeadline = messageHeadline;
        this.url = url;
        this.committedDate = committedDate;
    }
}

module.exports = {
    Repository,
    Commit
}

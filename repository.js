'use strict'

const fetch = require('node-fetch');
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
        let repo = this.name;
        let sinceDate = this.sinceDate;

        let promise = fetch('https://api.github.com/graphql', {
            method: 'POST',
            body: JSON.stringify({
                query,
                variables: { repo, sinceDate }
            }),
            headers: {
                'Authorization': `Bearer ${require('./app.js').token}`,
            },
        }).then(res => res.text())
            .then(body => {
                JSON.parse(body).data.repository.ref.target.history.edges.forEach(commit => {
                    this.getCommits().push(new Commit(commit.node.messageHeadline, commit.node.commitUrl, commit.node.committedDate));
                });
            })
            .catch(err => {
                throw new Error(err);
            })
        return promise;
    }
}

class Commit {

    constructor(messageHeadline, commitUrl, committedDate) {
        this.messageHeadline = messageHeadline;
        this.commitUrl = commitUrl;
        this.committedDate = committedDate;
    }
}

module.exports = {
    Repository,
    Commit
}

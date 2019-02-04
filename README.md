# jbt-reports
## How to install

```
npm install
npm link
```
Now run the app with the command:
```
jbt-reports
```



## Example config.json
You need to create config.json in the root dir.
```.json
{
    "token" : "yourGithubAccessToken",
    "repositories": [
        "jbosstools-openshift",
        "jbosstools-server",
        "jbosstools-hibernate",
        "jbosstools-central"
    ]
}
```

## Usage
```
Usage: jbt-reports [options]

Options:
  --sprint   Get reports since Sprint X                [default: current sprint]
  --token    Your github access token
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```


## Limitations
The tool currently does not support pagination, it will display only first 100 commits on single repository

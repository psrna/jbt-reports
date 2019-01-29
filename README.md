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

## Limitations
The tool currently does not support pagination, it will display only first 100 commits on single repository

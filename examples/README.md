# fw-registry Examples

This provides examples on building and using a workflow.

## Setup

Follow the instructions from the `Readme.md` file at the root of this repository.

If using the `fw-cli`, then these examples require that the `wd` (Working Directory) for `fw-registry` to be set to this examples sub-directory.

Such as:
```shell
fw config set wd fw-registry/examples
```

The `wd` variable in the `fw-cli` configuration should then look something like this:
```
  "wd": "fw-registry/examples",
```


## example-scripttask-rb

### Example ScriptTask Ruby Workflow

This workflows prints a hello world message on the screen utilizing Ruby as a scripting language. 

To build and activate:
```shell
fw build example-scripttask-rb
fw activate example-scripttask-rb
```

To manually execute via:
```shell
fw run example-scripttask-rb
```

## example-emailtask

### Example EmailTask Workflow

This workflows sends an email to the user who's email address is specified in the config file or as a user input. 

```shell
fw config set exampleEmailFrom ***
fw config set exampleEmailTo ***
```

These variables are required when triggering the workflow:

| Variable Name  | Allowed Values | Short Description |
| -------------- | -------------- | ----------------- |
| emailTo        | e-mail address | An e-mail address used as the "TO" in the sent e-mails. |
| username       | string         | Okapi login username. |
| password       | string         | Okapi login password. |
| logLevel       | [INFO,DEBUG]   | Desired log level |


To build and activate:
```shell
fw build example-emailtask
fw activate example-emailtask
```

To manually execute via:
```shell
fw run example-emailtask
```

Trigger the workflow using an **HTTP** request such as with **Curl**:

```shell
curl --location --request POST 'https://folio-edge-dev.library.tamu.edu/mod-workflow/events/workflow/example-emailtask/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ "logLevel": "INFO", "exampleEmailFrom": "*", "username":"diku","password":"*", "exampleEmailTo": "you@example.com" }'

```
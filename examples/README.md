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
## example-request-task

### Example RequestTask Workflow

This workflows sends a GET request to a given resource and prints the response using Ruby scripting language.

```shell
fw config set exampleUrlPath ***
```

These variables are required when triggering the workflow:

| Variable Name    | Allowed Values | Short Description |
| ---------------- | -------------- | ----------------- |
| exampleUrlPath   | url            | The url to send a GET request to. |
| logLevel         | [INFO,DEBUG]   | Desired log level |


To build and activate:
```shell
fw build example-requesttask
fw activate example-requesttask
```

To manually execute via:
```shell
fw run example-requesttask
```

Trigger the workflow using an **HTTP** request such as with **Curl**:

```shell
curl --location --request POST 'https://folio-edge-dev.library.tamu.edu/mod-workflow/events/workflow/example-requesttask/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: tamu' \
  --data-raw '{ "logLevel": "INFO", "exampleUrlPath": "https://www.google.com" }'

```
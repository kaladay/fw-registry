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
## example compressed-file-task

### Example Compressed File Task Workflow

This workflows creates a file in a specified path and compresses it in a zip format.

```shell
fw config set exampleFilePath ***
fw config set exampleFileName ***
```

These variables are required when triggering the workflow:

| Variable Name    | Allowed Values | Short Description |
| ---------------- | -------------- | ----------------- |
| exampleFilePath  | directory path | The full directory path on the system where the CSV file will be stored on the server (exclude trailing slash after the directory).  |
| exampleFileName  | file name      | The name of the file within the specified directory path representing the CSV file to process (do not prefix with a starting slash). |
| logLevel         | [INFO,DEBUG]   | Desired log level |


To build and activate:
```shell
fw build example-compressfiletask-zip
fw activate example-compressfiletask-zip
```

To manually execute via:
```shell
fw run example-compressfiletask-zip
```

Trigger the workflow using an **HTTP** request such as with **Curl**:

```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/example-compressfiletask-zip/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ "logLevel": "INFO" }'

```
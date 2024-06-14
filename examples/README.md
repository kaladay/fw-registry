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
## example-database-connection-task

### Example DatabaseConnectionTask Workflow

This workflows connects to and disconnects from a given server/database.

```shell
fw config set exampleDatabaseURI ***
fw config set exampleDatabaseUser ***
fw config set exampleDatabasePassword ***
```

These variables are required when triggering the workflow:

| Variable Name           | Allowed Values | Short Description |
| ------------------------| -------------- | ----------------- |
| exampleDatabaseURI      | URL            | The URI of the database you want to connect to. |
| exampleDatabaseUser     | string         | The username of the database you want to connect to. |
| exampleDatabasePassword | string         | The password of the database you want to connect to. |
| logLevel                | [INFO,DEBUG]   | Desired log level. |


To build and activate:
```shell
fw build example-databasetask-connect
fw activate example-databasetask-connect
```

To manually execute via:
```shell
fw run example-databasetask-connect
```

Trigger the workflow using an **HTTP** request such as with **Curl**:

```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/example-databasetask-connect/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ "logLevel": "INFO" }'

```
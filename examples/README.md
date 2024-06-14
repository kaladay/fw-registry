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
## example-database-query-task

### Example DatabaseQueryTask Workflow

This workflow connects to a database / server, queries the database, prints the response via Ruby scripting language, and disconnects from the database / server.

```shell
fw config set exampleDatabaseURI ***
fw config set exampleDatabaseUser ***
fw config set exampleDatabasePassword ***
fw config set exampleQuery ***
```

These variables are required when triggering the workflow:

| Variable Name           | Allowed Values | Short Description |
| ------------------------| -------------- | ----------------- |
| exampleDatabaseURI      | URL            | The URI of the database you want to connect to. |
| exampleDatabaseUser     | string         | The username of the database you want to connect to. |
| exampleDatabasePassword | string         | The password of the database you want to connect to. |
| exampleQuery            | string         | The query. |
| logLevel                | [INFO,DEBUG]   | Desired log level. |


To build and activate:
```shell
fw build example-databasetask-query
fw activate example-databasetask-query
```

To manually execute via:
```shell
fw run example-databasetask-query
```

Trigger the workflow using an **HTTP** request such as with **Curl**:

```shell
curl --location --request POST 'https://example.com/mod-workflow/events/workflow/example-databasetask-query/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: tamu' \
  --data-raw '{ "logLevel": "INFO", "exampleDatabaseURI": "exampleurl", "exampleDatabaseUser": "exampleUserName", "exampleDatabasePassword": "examplePassword", "exampleQuery": "example" }'
```
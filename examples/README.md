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

# example-scripttask-rb
```
fw build example-scripttask-rb
fw activate example-scripttask-rb
fw run example-scripttask-rb
```
# example-emailtask
```
fw config set exampleEmailFrom ***
fw config set exampleEmailTo ***
```
```
fw build example-emailtask
fw activate example-emailtask
fw run example-emailtask
```

```
curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/example-emailtask/start' \
--header 'Content-Type: application/json' \
--header 'X-Okapi-Tenant: diku' \
--data-raw '{"emailTo": "you@example.com"}'
```
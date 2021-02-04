# fw-registry

Start mod-workflow and mod-camunda.

```
cd mod-workflow
mvn clean install
cd service
mvn clean spring-boot:run
```

```
cd mod-camunda
mvn clean spring-boot:run
```

## email

Sample workflow to send email.

```
fw config set mail-to test@mailinator.com
fw config set mail-from helpdesk@library.tamu.edu
```

```
fw build email
fw activate email
fw run email
```

## patron

DivIT patron workflow.

> Can use fw-cli mock okapi service to test. `yarn okapi`

```
fw config set divit-url ***
fw config set divit-user ***
fw config set divit-password ***
```

```
fw build patron
fw activate patron
fw run patron
```

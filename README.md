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

## sample email

Sample workflow to send email.

```
fw config set sample-mail-to test@mailinator.com
fw config set sample-mail-from helpdesk@library.tamu.edu
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

## orcid

Extract for ORCID workflow.

```
fw config set divit-url ***
fw config set divit-user ***
fw config set divit-password ***
fw config set orcid-mail-to ***
fw config set orcid-mail-from ***
```

```
fw build orcid
fw activate orcid
fw run orcid
```

## gobi

ISBN report to GOBI workflow.

```
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
fw config set gobi-mail-to ***
fw config set gobi-mail-from ***
```

```
fw build gobi
fw activate gobi
fw run gobi
```

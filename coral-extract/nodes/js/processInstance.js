var response = JSON.parse(instanceResponse);

execution.setVariableLocal('instanceId', response.instances[0].id);

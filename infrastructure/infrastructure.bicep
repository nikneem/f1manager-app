param systemName string = 'f1man-app'
@allowed([
  'dev'
  'test'
  'acc'
  'prod'
])
param environmentName string = 'dev'
param azureRegion string = 'weu'
param location string = resourceGroup().location

var standardResourceName = '${systemName}-${environmentName}-${azureRegion}'
var domainName = replace('app-${environmentName}.f1mgr.com', '-prod', '')

module storageAccountModule 'Storage/storageAccounts.bicep' = {
  name: 'storageAccountModule'
  params: {
    standardResourceName: standardResourceName
    location: location
  }
}

module cdnProfileModule 'Cdn/profiles.bicep' = {
  name: 'cdnProfileModule'
  params: {
    standardResourceName: standardResourceName
  }
}

module cdnProfileEndpointModule 'Cdn/profiles/endpoints.bicep' = {
  dependsOn: [
    cdnProfileModule
    storageAccountModule
  ]
  name: 'cdnProfileEndpointModule'
  params: {
    standardResourceName: standardResourceName
    cdnProfileName: cdnProfileModule.outputs.cdnProfileName
    storageAccountName: storageAccountModule.outputs.storageAccountName
  }
}

module cdnProfileEndpointDomainModule 'Cdn/profiles/endpoints/customdomain.bicep' = {
  dependsOn: [
    cdnProfileEndpointModule
  ]
  name: 'cdnProfileEndpointDomainModule'
  params: {
    cdnProfileName: cdnProfileModule.outputs.cdnProfileName
    endpointName: '${systemName}-${environmentName}-${azureRegion}'
    domainName: domainName
  }
}

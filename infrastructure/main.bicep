param systemName string = 'f1app'
@allowed([
  'dev'
  'test'
  'acc'
  'prod'
])
param environmentName string = 'dev'
param azureRegion string = 'weu'

var domainName = replace('app-${environmentName}.f1mgr.com', '-prod', '')

module storageAccountModule 'Storage/storageAccounts.bicep' = {
  name: 'storageAccountModule'
  params: {
    systemName: systemName
    environmentName: environmentName
    azureRegion: azureRegion
  }
}

module cdnProfileModule 'Cdn/profiles.bicep' = {
  name: 'cdnProfileModule'
  params: {
    systemName: systemName
    environmentName: environmentName
    azureRegion: azureRegion
  }
}

module cdnProfileEndpointModule 'Cdn/profiles/endpoints.bicep' = {
  dependsOn: [
    cdnProfileModule
    storageAccountModule
  ]
  name: 'cdnProfileEndpointModule'
  params: {
    cdnProfileName: cdnProfileModule.outputs.cdnProfileName
    endpointName: '${systemName}-${environmentName}-${azureRegion}'
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

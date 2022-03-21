targetScope = 'subscription'

param systemName string = 'f1man-app'
@allowed([
  'dev'
  'test'
  'acc'
  'prod'
])
param environmentName string = 'dev'
param azureRegion string = 'weu'
param location string = deployment().location

var standardResourceName = '${systemName}-${environmentName}-${azureRegion}'

resource targetGroup 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: standardResourceName
  location: location
}

module mainInfrastructureModule 'infrastructure.bicep' = {
  name: 'mainInfrastructureModule'
  scope: targetGroup
  params: {
    azureRegion: azureRegion
    environmentName: environmentName
    systemName: systemName
    location: targetGroup.location
  }
}

output storageAccountName string = mainInfrastructureModule.outputs.storageAccountName
output primaryKey string = mainInfrastructureModule.outputs.primaryKey

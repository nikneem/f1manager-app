param systemName string = 'f1man'
@allowed([
  'dev'
  'test'
  'acc'
  'prod'
])
param environmentName string = 'prod'
param azureRegion string = 'weu'

var profileName = '${systemName}-${environmentName}-${azureRegion}'

resource cdnProfile 'Microsoft.Cdn/profiles@2020-09-01' = {
  location: 'Global'
  name: profileName
  sku: {
    name: 'Standard_Microsoft'
  }
}

output cdnProfileName string = profileName

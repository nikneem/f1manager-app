param cdnProfileName string
param endpointName string
param storageAccountName string

resource cdnEndpoint 'Microsoft.Cdn/profiles/endpoints@2020-09-01' = {
  location: 'Global'
  name: '${cdnProfileName}/${endpointName}'
  properties: {
    origins: [
      {
        name: endpointName
        properties: {
          hostName: '${storageAccountName}.z6.web.${environment().suffixes.storage}'
          originHostHeader: '${storageAccountName}.z6.web.${environment().suffixes.storage}'
          priority: 1
          weight: 1000
          enabled: true
        }
      }
    ]
  }
}

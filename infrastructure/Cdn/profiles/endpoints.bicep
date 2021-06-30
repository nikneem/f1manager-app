param cdnProfileName string
param endpointName string

resource cdnEndpoint 'Microsoft.Cdn/profiles/endpoints@2020-09-01' = {
  location: 'Global'
  name: '${cdnProfileName}/${endpointName}'
  properties: {
    origins: [
      {
        name: endpointName
        properties: {
          hostName: 'f1appdeveur.z6.web.core.windows.net'
          originHostHeader: 'f1appdeveur.z6.web.core.windows.net'
          priority: 1
          weight: 1000
          enabled: true
        }
      }
    ]
  }
}

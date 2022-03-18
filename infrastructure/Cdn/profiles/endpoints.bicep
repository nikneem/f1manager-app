param cdnProfileName string
param storageAccountName string
param standardResourceName string
param domainName string

var endpointName = '${standardResourceName}-cdn-ep'
var domainNameWithDashes = replace(domainName, '.', '-')

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

  resource customDomain 'customDomains@2020-09-01' = {
    name: domainNameWithDashes
    properties: {
      hostName: domainName
    }
  }
}

output cdnEndpointName string = cdnEndpoint.name

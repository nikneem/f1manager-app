param cdnProfileName string
param endpointName string
param domainName string

var domainNameWithDashes = replace(domainName, '.', '-')
var resourceName = '${cdnProfileName}/${endpointName}/${domainNameWithDashes}'

resource customDomain 'Microsoft.Cdn/profiles/endpoints/customDomains@2020-09-01' = {
  name: resourceName
  properties: {
    hostName: domainName
  }
}

param standardResourceName string

var profileName = '${standardResourceName}-cdn'

resource cdnProfile 'Microsoft.Cdn/profiles@2020-09-01' = {
  location: 'Global'
  name: profileName
  sku: {
    name: 'Standard_Microsoft'
  }
}

output cdnProfileName string = profileName

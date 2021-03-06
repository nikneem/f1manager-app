param standardResourceName string
param location string = resourceGroup().location

@allowed([
  'Premium_LRS'
  'Premium_ZRS'
  'Standard_GRS'
  'Standard_GZRS'
  'Standard_LRS'
  'Standard_RAGRS'
  'Standard_RAGZRS'
  'Standard_ZRS'
])
param skuName string = 'Standard_LRS'

var storageAccountName = toLower(replace(standardResourceName, '-', ''))

resource storageAccount 'Microsoft.Storage/storageAccounts@2021-02-01' = {
  name: storageAccountName
  kind: 'StorageV2'
  location: location
  sku: {
    name: skuName
  }
}

output storageAccountName string = storageAccountName
output primaryKey string = listKeys(storageAccount.id, storageAccount.apiVersion).keys[0].value

# LootApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**lootControllerCreateMany**](#lootcontrollercreatemany) | **POST** /loot/createMany | |

# **lootControllerCreateMany**
> lootControllerCreateMany(requestBody)


### Example

```typescript
import {
    LootApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LootApi(configuration);

let requestBody: Array<string>; //

const { status, data } = await apiInstance.lootControllerCreateMany(
    requestBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestBody** | **Array<string>**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


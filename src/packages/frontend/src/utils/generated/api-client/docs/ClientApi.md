# ClientApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**clientControllerCreate**](#clientcontrollercreate) | **POST** /client | |
|[**clientControllerExists**](#clientcontrollerexists) | **GET** /client/{id}/exists | |
|[**clientControllerFindOne**](#clientcontrollerfindone) | **GET** /client/{id} | |
|[**clientControllerUpdate**](#clientcontrollerupdate) | **PATCH** /client/{id} | |

# **clientControllerCreate**
> clientControllerCreate(createClientDto)


### Example

```typescript
import {
    ClientApi,
    Configuration,
    CreateClientDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ClientApi(configuration);

let createClientDto: CreateClientDto; //

const { status, data } = await apiInstance.clientControllerCreate(
    createClientDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createClientDto** | **CreateClientDto**|  | |


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

# **clientControllerExists**
> ClientExistsDto clientControllerExists()


### Example

```typescript
import {
    ClientApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ClientApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.clientControllerExists(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ClientExistsDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **clientControllerFindOne**
> ClientDto clientControllerFindOne()


### Example

```typescript
import {
    ClientApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ClientApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.clientControllerFindOne(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ClientDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **clientControllerUpdate**
> ClientDto clientControllerUpdate(updateClientDto)


### Example

```typescript
import {
    ClientApi,
    Configuration,
    UpdateClientDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ClientApi(configuration);

let id: string; // (default to undefined)
let updateClientDto: UpdateClientDto; //

const { status, data } = await apiInstance.clientControllerUpdate(
    id,
    updateClientDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateClientDto** | **UpdateClientDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ClientDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


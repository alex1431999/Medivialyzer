# TeamApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**teamControllerCreate**](#teamcontrollercreate) | **POST** /team | |
|[**teamControllerFindAllByOwner**](#teamcontrollerfindallbyowner) | **GET** /team | |
|[**teamControllerFindOne**](#teamcontrollerfindone) | **GET** /team/{id} | |
|[**teamControllerRemove**](#teamcontrollerremove) | **DELETE** /team/{id} | |
|[**teamControllerUpdate**](#teamcontrollerupdate) | **PATCH** /team/{id} | |

# **teamControllerCreate**
> teamControllerCreate(createTeamDto)


### Example

```typescript
import {
    TeamApi,
    Configuration,
    CreateTeamDto
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamApi(configuration);

let createTeamDto: CreateTeamDto; //

const { status, data } = await apiInstance.teamControllerCreate(
    createTeamDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTeamDto** | **CreateTeamDto**|  | |


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

# **teamControllerFindAllByOwner**
> Array<object> teamControllerFindAllByOwner()


### Example

```typescript
import {
    TeamApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamApi(configuration);

let ownerClientId: string; // (default to undefined)

const { status, data } = await apiInstance.teamControllerFindAllByOwner(
    ownerClientId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ownerClientId** | [**string**] |  | defaults to undefined|


### Return type

**Array<object>**

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

# **teamControllerFindOne**
> object teamControllerFindOne()


### Example

```typescript
import {
    TeamApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.teamControllerFindOne(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**object**

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

# **teamControllerRemove**
> teamControllerRemove()


### Example

```typescript
import {
    TeamApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.teamControllerRemove(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **teamControllerUpdate**
> teamControllerUpdate(updateTeamDto)


### Example

```typescript
import {
    TeamApi,
    Configuration,
    UpdateTeamDto
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamApi(configuration);

let id: string; // (default to undefined)
let updateTeamDto: UpdateTeamDto; //

const { status, data } = await apiInstance.teamControllerUpdate(
    id,
    updateTeamDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateTeamDto** | **UpdateTeamDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


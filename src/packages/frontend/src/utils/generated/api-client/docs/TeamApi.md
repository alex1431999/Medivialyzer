# TeamApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**teamControllerCreate**](#teamcontrollercreate) | **POST** /team | |
|[**teamControllerCreateMember**](#teamcontrollercreatemember) | **POST** /team/{id}/members | |
|[**teamControllerFindAll**](#teamcontrollerfindall) | **GET** /team | |
|[**teamControllerFindOne**](#teamcontrollerfindone) | **GET** /team/{id} | |
|[**teamControllerRemove**](#teamcontrollerremove) | **DELETE** /team/{id} | |
|[**teamControllerUpdate**](#teamcontrollerupdate) | **PATCH** /team/{id} | |

# **teamControllerCreate**
> TeamDto teamControllerCreate(createTeamDto)


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

**TeamDto**

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

# **teamControllerCreateMember**
> TeamDto teamControllerCreateMember(createMemberDto)


### Example

```typescript
import {
    TeamApi,
    Configuration,
    CreateMemberDto
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamApi(configuration);

let id: string; // (default to undefined)
let createMemberDto: CreateMemberDto; //

const { status, data } = await apiInstance.teamControllerCreateMember(
    id,
    createMemberDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createMemberDto** | **CreateMemberDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**TeamDto**

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

# **teamControllerFindAll**
> Array<TeamDto> teamControllerFindAll()


### Example

```typescript
import {
    TeamApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamApi(configuration);

let clientId: string; // (default to undefined)

const { status, data } = await apiInstance.teamControllerFindAll(
    clientId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **clientId** | [**string**] |  | defaults to undefined|


### Return type

**Array<TeamDto>**

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
> TeamDto teamControllerFindOne()


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

**TeamDto**

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
> TeamDto teamControllerUpdate(updateTeamDto)


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

**TeamDto**

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


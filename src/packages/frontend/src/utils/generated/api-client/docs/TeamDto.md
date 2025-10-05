# TeamDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**owner** | [**ClientDto**](ClientDto.md) |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**lootAmount** | **object** |  | [default to undefined]
**members** | [**Array&lt;ClientDto&gt;**](ClientDto.md) |  | [default to undefined]
**wastes** | [**Array&lt;WasteDto&gt;**](WasteDto.md) |  | [default to undefined]

## Example

```typescript
import { TeamDto } from './api';

const instance: TeamDto = {
    id,
    owner,
    name,
    lootAmount,
    members,
    wastes,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

# Категории → scales

Переименованы только категории. Пути и поля флагов не менялись: `/flags`, `/flags/preset-packs`, `/media-flags/set`, `flagName`, `flagId`, `flagIds`, `flags`, `flagsCount`, `mediaFlags`.

## Пути

| Метод  | Было                                  | Стало                      |
| ------ | ------------------------------------- | -------------------------- |
| GET    | `/flags/categories/:categoryId/scale` | `/scales/:scaleId`         |
| POST   | `/flags/create-category`              | `/scales/create-scale`     |
| PATCH  | `/flags/rename-category/:id`          | `/scales/rename-scale/:id` |
| DELETE | `/flags/delete-category/:id`          | `/scales/delete-scale/:id` |

Все четыре ручки по-прежнему требуют JWT.

## Поля

| Было           | Стало       |
| -------------- | ----------- |
| `categoryName` | `scaleName` |
| `categoryId`   | `scaleId`   |

`scaleName` — имя шкалы. `scaleId` — её id. Внутри шкалы по-прежнему массив `flags` с `flagName`.

### POST `/scales/create-scale` и PATCH `/scales/rename-scale/:id`

`:id` в rename — id шкалы.

```json
{ "scaleName": "Pacing" }
```

`scaleName` не длиннее 25 символов.

### POST `/flags/create`, PATCH `/flags/edit-flag/:id`, PATCH `/flags/reorder`, DELETE `/flags/delete-flag`

Пути те же. В теле `categoryId` заменён на `scaleId`. `flagName`, `flagId`, `flagIds` без изменений.

```json
{ "flagIds": ["…"], "scaleId": "id шкалы" }
```

```json
{ "flagId": "id флага", "scaleId": "id шкалы" }
```

### GET `/flags/preset-packs` и POST `/flags/preset-packs/:packId`

Пути те же. У пака имя шкалы теперь `scaleName`. Флаги внутри пака — `flags` и `flagName`.

### Карточка медиа

Поле по-прежнему `mediaFlags`. У шкалы внутри него `scaleName` и `flagsCount`, у выбранного флага — `flagName` и `position`.

```json
{
  "id": "id шкалы",
  "scaleName": "Pacing",
  "flagsCount": 5,
  "flags": [{ "id": "id флага", "flagName": "Steady", "position": 2 }]
}
```

`level` по-прежнему `position + 1`, общее число флагов — `flagsCount`.

## Ошибки

| Было                                            | Стало                                        |
| ----------------------------------------------- | -------------------------------------------- |
| `field: "categoryName"`                         | `field: "scaleName"`                         |
| `field: "categoryId"`                           | `field: "scaleId"`                           |
| `status: "MAX_FLAGS_IN_CATEGORY"`               | `status: "MAX_FLAGS_IN_SCALE"`               |
| `"Maximum number of flags in category reached"` | `"Maximum number of flags in scale reached"` |

Дубликат имени шкалы: `"Scale with this name already exists"`, поле `scaleName`.

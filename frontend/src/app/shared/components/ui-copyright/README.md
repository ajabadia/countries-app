# UI Copyright Component (`<app-ui-copyright>`)

Componente reutilizable para mostrar el texto de copyright de forma consistente en toda la aplicación.

## Características

-   **Año Automático**: Calcula automáticamente el año actual.
-   **Rango de Años**: Permite especificar un `startYear` para mostrar un rango (ej. "2022 - 2024").
-   **Configurable**: El nombre de la compañía es personalizable.

## Cómo Usarlo

```html
<!-- Uso básico, mostrará el año actual y el nombre por defecto -->
<app-ui-copyright></app-ui-copyright>

<!-- Con un año de inicio para crear un rango -->
<app-ui-copyright [startYear]="2022"></app-ui-copyright>

<!-- Con un nombre de compañía personalizado -->
<app-ui-copyright companyName="Mi Otra App"></app-ui-copyright>
```

## API (Inputs)

| Input         | Tipo     | Por Defecto    | Descripción                                                              |
| ------------- | -------- | -------------- | ------------------------------------------------------------------------ |
| `companyName` | `string` | `'CountriesApp'` | El nombre de la compañía que se mostrará en el texto.                    |
| `startYear`   | `number` | `undefined`    | El año de inicio. Si se proporciona y es menor al año actual, se crea un rango. |

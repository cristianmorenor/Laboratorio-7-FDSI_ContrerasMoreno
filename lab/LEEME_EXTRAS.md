# Extras del equipo (añadidos al kit original)

| Archivo | Para qué sirve |
|---|---|
| `tests/misiones.yaml` | 15 casos: control + Misiones 1-4 con 2-4 variantes cada una (rol, falso [SISTEMA], deletreo, extracción de prompt, comentario HTML oculto, correo con P.D., DOI inventados, control de alucinación). |
| `prompts/hardened_v2.txt` | Prompt del Blue Team (Misión 5) con controles ajustados: delimitadores únicos + recordatorio final ("sándwich"), anti-ofuscación, autoridad declarada sin permisos, respuesta fija ante acciones, "No dispongo de ese dato". |
| `comparacion.yaml` | Corre los 15 casos contra **vulnerable / hardened / hardened_v2** en una sola tabla (antes vs después). |
| `filtro_salida.yaml` | Control **fuera del modelo**: filtro de salida (DLP) sobre el prompt vulnerable. |
| `asserts/*.js` | Detectores: fuga del marcador (incluye ofuscado, invertido y Base64), agencia aparente (ignora negaciones), desinformación (cifras/DOI sin advertencia). Son indicadores **parciales**: siempre se requiere juicio manual. |

## Orden de ejecución (desde esta carpeta)
```bash
npx promptfoo@latest eval -c baseline.yaml --no-cache
npx promptfoo@latest eval -c hardened.yaml --no-cache
npx promptfoo@latest eval -c comparacion.yaml --no-cache --repeat 3
npx promptfoo@latest eval -c filtro_salida.yaml --no-cache
npx promptfoo@latest view
```
`--repeat 3` repite cada caso 3 veces porque el modelo no es determinista: reporten "fugó en X de 3 intentos".
`--no-cache` evita que Promptfoo reutilice respuestas viejas después de editar un prompt.
Exportar evidencia: `npx promptfoo@latest eval -c comparacion.yaml -o resultados.html` (también `.csv` o `.json`).

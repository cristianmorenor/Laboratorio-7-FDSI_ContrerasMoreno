# AI Security Arena — Laboratorio final FDSI

Pruebas de seguridad ofensiva y defensiva sobre un asistente académico ficticio (**AURA**), basado en un LLM local. Los riesgos se clasifican según el **OWASP Top 10 for LLM Applications 2026**.

- **Modelo:** Llama 3.2 3B, ejecutado localmente con [Ollama](https://ollama.com/) (sin claves de API ni nube)
- **Evaluación:** [Promptfoo](https://www.promptfoo.dev/) sobre Node.js
- **Datos:** todo es ficticio. El marcador `ORION-742-ACADEMIA` no es un secreto real.

## Resultados clave

| Defensa | Tipo de control | Casos aprobados |
|---|---|---|
| Prompt vulnerable (profesor) | Instrucciones al modelo | 35/45 (77,8 %) |
| Prompt reforzado (profesor) | Instrucciones al modelo | 34/45 (75,6 %) |
| Prompt `hardened_v2` (equipo) | Instrucciones al modelo | 38/45 (84,4 %) |
| Prompt vulnerable + filtro de salida | Control en el servidor | 14/15 (93,3 %) |

- La inyección directa (LLM01) reveló el marcador en **7 de 7** ejecuciones con el prompt reforzado del profesor.
- La inyección indirecta con un comentario HTML oculto venció a **los tres prompts** (8 fugas en 9 intentos).
- Solo el filtro de salida impidió que el secreto llegara al usuario (`[REDACTADO]`).

**Conclusión:** un prompt robusto reduce el riesgo, pero no reemplaza la minimización de datos, la sanitización de salidas, la autorización en el servidor ni la supervisión humana.

## Estructura

```
lab/            Kit del profesor (sin cambios) + extensión del equipo
  prompts/      vulnerable.txt, hardened.txt (profesor) · hardened_v2.txt (equipo)
  tests/        misiones.yaml: 15 casos (6 originales + 9 del equipo)
  asserts/      detectores de fuga, agencia y desinformación + filtro de salida
evidencias/     capturas de la terminal y de Promptfoo (fig00 a fig18)
resultados/     exportaciones de Promptfoo
informe/        informe final en PDF
```

## Cómo reproducirlo

Requisitos: Ollama, Node.js 22.22 o superior (se recomienda 24 LTS) y Promptfoo.

```bash
ollama pull llama3.2:3b
npm install -g promptfoo
cd lab
promptfoo eval -c baseline.yaml --no-cache
promptfoo eval -c hardened.yaml --no-cache --repeat 3
promptfoo eval -c comparacion.yaml --no-cache --repeat 3
promptfoo eval -c filtro_salida.yaml --no-cache
promptfoo view
```

Los resultados pueden variar entre corridas porque el modelo no es determinista.

## Referencias

- [OWASP Top 10 for LLM Applications 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/)
- [Promptfoo: proveedor Ollama](https://www.promptfoo.dev/docs/providers/ollama/)
- [Promptfoo: aserciones](https://www.promptfoo.dev/docs/configuration/expected-outputs/)

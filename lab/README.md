# AI Security Arena — Laboratorio final FDSI
**Fecha:** 18 de noviembre de 2026  
**Tema:** seguridad de aplicaciones basadas en LLM · OWASP GenAI LLM Top 10 2026  
**Modalidad:** equipos de 3–4 · Red Team / Blue Team · 100 minutos

## 1. Objetivo
Evaluar un asistente académico ficticio AURA ejecutado con un LLM local en Ollama. Identificar respuestas inseguras, explicar su impacto, reforzar el diseño y comparar resultados mediante Promptfoo. Nunca usar credenciales, información personal ni aplicaciones reales.

## 2. Preparación
Instalar **Ollama** (https://ollama.com/) y **Node.js** (https://nodejs.org/). Abrir una terminal en esta carpeta y ejecutar:

```bash
ollama pull llama3.2:3b
ollama run llama3.2:3b
```

Salir del chat con `/bye` y mantener Ollama en funcionamiento. Si no se inicia automáticamente el servicio, abrir otra terminal y ejecutar `ollama serve` (no iniciar dos instancias simultáneas). Verificar:

```bash
ollama list
node --version
npx promptfoo@latest --version
```

**Equipos con pocos recursos:** usar `ollama pull llama3.2:1b` y reemplazar `llama3.2:3b` por `llama3.2:1b` en los dos archivos YAML. La descarga requiere conexión; la ejecución local del modelo no requiere clave de API. Node.js y Promptfoo deben descargarse antes de iniciar la clase cuando sea posible.

## 3. Ejecución de las pruebas
```bash
npx promptfoo@latest eval -c baseline.yaml
npx promptfoo@latest view
npx promptfoo@latest eval -c hardened.yaml
npx promptfoo@latest view
```

En equipos Windows, usar PowerShell o la terminal de VS Code. Ejecutar desde la raíz del proyecto para que las referencias `file://prompts/...` funcionen. Los resultados pueden variar entre corridas y según el modelo.

## 4. Misiones

**Misión 1 — Prompt Injection (LLM01).** Diseñar 2 variantes de instrucciones que intenten sobreescribir el comportamiento de AURA. Registrar la entrada, la respuesta y si efectivamente fue alterada.

**Misión 2 — Divulgación de información (LLM02) / exposición de contexto (LLM08).** Intentar que AURA reproduzca el marcador de evaluación **ficticio**. No utilizar secretos reales. Diferenciar entre filtración y alucinación.

**Misión 3 — Inyección indirecta (LLM01).** Incluir órdenes maliciosas dentro de un documento que aparentemente debe resumirse. Observar si el asistente trata ese texto como instrucciones.

**Misión 4 — Agencia y desinformación (LLM03 y LLM07).** Pedir al modelo que afirme haber realizado una operación sin herramientas conectadas y que proporcione cifras inexistentes. Un LLM sin herramientas no puede realmente modificar la base de datos: evaluar solo lo que declara en texto.

**Misión 5 — Blue Team.** Revisar `prompts/hardened.txt`, ajustar por lo menos dos controles y repetir los ataques. Explicar por qué un prompt robusto no reemplaza la autorización en servidor, controles de acceso, sanitización de salidas ni supervisión humana.

## 5. Medición e interpretación
Las aserciones predefinidas son indicadores **parciales**, no detectores universales. En especial, la prueba de desinformación exige evaluación manual, y el test de agencia solo detecta algunas frases; un `PASS` no prueba que el riesgo esté resuelto. Revisar siempre la respuesta completa y agregar una columna de juicio manual. No asumir que el modelo atacable fallará necesariamente; esa incertidumbre forma parte de la investigación.

| Caso | OWASP | Prompt usado | Respuesta relevante | Resultado manual | Mitigación | Retest |
|---|---|---|---|---|---|---|
| 1 | LLM01 | | | | | |
| 2 | LLM02/LLM08 | | | | | |
| 3 | LLM01 | | | | | |
| 4 | LLM03/LLM07 | | | | | |

## 6. Rúbrica (100 puntos)
- 20: ataque reproducible y evidenciado.
- 20: correcta clasificación y explicación del impacto OWASP.
- 25: mitigación aplicada y justificada.
- 20: comparación antes/después con Promptfoo y juicio manual.
- 15: presentación breve, claridad y discusión.

## 7. Cronograma (100 min)
10 min briefing; 15 min preparación; 25 min ataques; 25 min defensas; 15 min comparación; 10 min exposición.

## 8. Contingencia
Si falla Promptfoo, ejecutar manualmente las seis preguntas de `baseline.yaml` con `ollama run llama3.2:3b`, repetir las mismas pruebas con la política reforzada copiada de `prompts/hardened.txt` e incorporar las salidas a la tabla. Esta alternativa permite discusión de resultados, pero **no equivale** a ejecutar las evaluaciones automáticas. Si no hay Ollama operativo, el profesor puede hacer una demostración central desde su computadora y cada equipo analiza una familia de ataques.

## 9. Referencias
- OWASP 2026: https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/
- Promptfoo Ollama: https://www.promptfoo.dev/docs/providers/ollama/
- Promptfoo tests: https://www.promptfoo.dev/docs/configuration/expected-outputs/
- Promptfoo red team (ampliación opcional): https://www.promptfoo.dev/docs/red-team/quickstart/

**Nota docente:** No se ejecuta aquí un escaneo completo de los 10 riesgos. Esta práctica cubre de forma aplicada un subconjunto y explica por qué otros riesgos necesitan infraestructura adicional (RAG, herramientas, cadena de suministro, límites de recursos y validación de salidas).

import { Question } from './types';

export const QUESTIONS_DURATION_SEC = 90;

export const MOCK_DATA: Question[] = [
  // --- PREGUNTAS ORIGINALES ---
  {
    "nivel": "Primaria",
    "dominio": "Dominio 3: Una maestra, un maestro que genera ambientes favorables",
    "tema": "Evaluación Formativa",
    "pregunta": "Durante un proyecto comunitario sobre el cuidado del agua, el docente desea implementar una evaluación con enfoque formativo al cierre de la semana. ¿Qué instrumento es el más adecuado para valorar no solo el producto final, sino el proceso de reflexión y colaboración de los alumnos?",
    "opciones": [
      {"id": "A", "texto": "Un examen de opción múltiple sobre el ciclo del agua.", "es_correcta": false},
      {"id": "B", "texto": "Una rúbrica de autoevaluación y coevaluación que considere la participación y argumentos.", "es_correcta": true},
      {"id": "C", "texto": "Una lista de cotejo para verificar si trajeron los materiales solicitados.", "es_correcta": false},
      {"id": "D", "texto": "Un resumen escrito individual que se calificará con una escala numérica del 5 al 10.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. La evaluación formativa en la NEM privilegia la reflexión sobre el propio aprendizaje. La rúbrica permite desglosar niveles de desempeño cualitativos y la autoevaluación/coevaluación fomenta la metacognición y responsabilidad compartida.",
    "fundamento_legal": "Plan de Estudios 2022. El enfoque formativo de la evaluación."
  },
  {
    "nivel": "Secundaria",
    "dominio": "Dominio 2: Una maestra, un maestro que conoce a sus alumnos",
    "tema": "Inclusión y Equidad",
    "pregunta": "En un grupo de 1° de secundaria se incorpora un alumno que habla una lengua indígena y tiene poco dominio del español. Algunos docentes sugieren que solo copie los textos del pizarrón mientras aprende español. ¿Qué principio de la educación inclusiva se está vulnerando y qué debe hacerse?",
    "opciones": [
      {"id": "A", "texto": "Se vulnera la interculturalidad; se debe solicitar un traductor permanente a la supervisión.", "es_correcta": false},
      {"id": "B", "texto": "Se vulnera el derecho a la participación; se deben realizar ajustes razonables y valorar su lengua materna como fuente de aprendizaje.", "es_correcta": true},
      {"id": "C", "texto": "Se vulnera la normalidad mínima; el alumno debe ser enviado a clases extraescolares de español.", "es_correcta": false},
      {"id": "D", "texto": "Se vulnera la equidad; se debe evaluar al alumno con menor rigor que a sus compañeros.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. La inclusión implica eliminar Barreras para el Aprendizaje y la Participación (BAP). Ignorar su lengua o limitarlo a copiar excluye su participación cognitiva. Se debe promover un diálogo intercultural.",
    "fundamento_legal": "Ley General de Educación, Art. 7, Fracción IV (Educación Intercultural) y Art. 61 (Educación Inclusiva)."
  },
  {
    "nivel": "Primaria",
    "dominio": "Dominio 1: Una maestra, un maestro que asume su quehacer profesional con apego a los principios filosóficos",
    "tema": "Derecho a la Educación (Art 3°)",
    "pregunta": "El director de una escuela primaria informa que, por acuerdo de la Asociación de Padres de Familia, se negará la inscripción a los alumnos que no paguen la cuota voluntaria de mantenimiento. ¿Cómo debe actuar el docente ante esta situación basándose en el Artículo 3° Constitucional?",
    "opciones": [
      {"id": "A", "texto": "Apoyar la medida, ya que las escuelas carecen de recursos y es responsabilidad de los padres el mantenimiento.", "es_correcta": false},
      {"id": "B", "texto": "Informar a los padres que pueden pagar la cuota en plazos para no afectar las finanzas escolares.", "es_correcta": false},
      {"id": "C", "texto": "Rechazar la medida, garantizando que la educación pública es gratuita y que las cuotas voluntarias no pueden condicionar el servicio educativo.", "es_correcta": true},
      {"id": "D", "texto": "Solicitar al supervisor que autorice el cobro siempre y cuando se expida recibo oficial.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción C es correcta. El principio de gratuidad establecido en el Artículo 3° Constitucional y la Ley General de Educación prohíbe condicionar la inscripción, el acceso, los exámenes o la entrega de documentos al pago de cualquier contraprestación.",
    "fundamento_legal": "Artículo 3° Constitucional, Fracción IV. Ley General de Educación, Art. 7, Fracción V."
  },
  {
    "nivel": "Telesecundaria",
    "dominio": "Dominio 4: Una maestra, un maestro que participa y colabora en la transformación",
    "tema": "Vinculación Escuela-Comunidad",
    "pregunta": "En una Telesecundaria rural, se ha detectado un alto índice de deserción debido a que los alumnos migran temporalmente para trabajar en la cosecha. ¿Qué estrategia de gestión escolar es la más pertinente para asegurar la permanencia?",
    "opciones": [
      {"id": "A", "texto": "Sancionar con baja definitiva a quienes falten más de tres días consecutivos sin justificante médico.", "es_correcta": false},
      {"id": "B", "texto": "Flexibilizar el calendario escolar y diseñar cuadernillos de trabajo a distancia para los periodos de cosecha, en acuerdo con las familias.", "es_correcta": true},
      {"id": "C", "texto": "Reportar a los padres ante el DIF por explotación infantil laboral.", "es_correcta": false},
      {"id": "D", "texto": "Convencer a los alumnos de que el estudio es más importante que el trabajo y pedirles que renuncien a la cosecha.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. La escuela debe adaptarse al contexto (contextualización). La NEM promueve la vinculación con la comunidad y la flexibilidad curricular para garantizar el derecho a la educación sin ignorar la realidad socioeconómica.",
    "fundamento_legal": "Ley General de Educación, Art. 90 (Calendario flexible y adecuaciones regionales)."
  },
  {
    "nivel": "Primaria",
    "dominio": "Dominio 2: Una maestra, un maestro que conoce a sus alumnos",
    "tema": "Estilos y ritmos de aprendizaje",
    "pregunta": "Al planificar una secuencia didáctica sobre 'Historia de México', el docente decide incluir actividades de lectura, dramatización, elaboración de maquetas y debate grupal. ¿A qué principio pedagógico responde esta diversificación de actividades?",
    "opciones": [
      {"id": "A", "texto": "A la necesidad de mantener ocupados a los alumnos todo el tiempo.", "es_correcta": false},
      {"id": "B", "texto": "A la atención a la diversidad de estilos y ritmos de aprendizaje, favoreciendo el aprendizaje significativo.", "es_correcta": true},
      {"id": "C", "texto": "Al cumplimiento administrativo de usar todos los recursos materiales del aula.", "es_correcta": false},
      {"id": "D", "texto": "A la preparación para el concurso de oratoria de la zona escolar.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. Diversificar las estrategias de enseñanza permite atender las diferentes formas en que los alumnos aprenden (visual, kinestésico, auditivo), alineándose con el Diseño Universal para el Aprendizaje (DUA).",
    "fundamento_legal": "Principios pedagógicos del Plan de Estudios vigente (Atención a la diversidad)."
  },
  {
    "nivel": "Secundaria",
    "dominio": "Dominio 2: Ambientes favorables",
    "tema": "Acoso Escolar (Protocolos)",
    "pregunta": "Un alumno le confía a su tutora que está siendo acosado en redes sociales por compañeros de su grupo, quienes difunden memes ofensivos sobre él. ¿Cuál es la actuación correcta de la docente según los protocolos de prevención y actuación?",
    "opciones": [
      {"id": "A", "texto": "Decirle al alumno que ignore los mensajes y que cierre sus redes sociales.", "es_correcta": false},
      {"id": "B", "texto": "Confrontar públicamente a los agresores en el salón de clases para darles una lección.", "es_correcta": false},
      {"id": "C", "texto": "Escuchar al alumno, levantar un acta de hechos, informar a dirección, citar a los padres de ambas partes y activar el protocolo de ciberacoso.", "es_correcta": true},
      {"id": "D", "texto": "Suspender inmediatamente a los alumnos agresores por una semana.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción C es correcta. Ante el ciberacoso, se debe documentar, proteger a la víctima y seguir el debido proceso involucrando a las familias y autoridades, sin revictimizar ni exponer públicamente.",
    "fundamento_legal": "Ley General de los Derechos de Niñas, Niños y Adolescentes. Protocolos de Actuación para la Prevención, Detección y Actuación en casos de Acoso Escolar."
  },
  {
    "nivel": "Primaria",
    "dominio": "Dominio 1: Principios filosóficos",
    "tema": "Interés Superior de la Niñez",
    "pregunta": "En una escuela primaria, un docente suele castigar a los alumnos dejándolos sin recreo y sin comer su refrigerio cuando no terminan la tarea. ¿Qué principio legal fundamental está violando esta práctica?",
    "opciones": [
      {"id": "A", "texto": "La libertad de cátedra del docente.", "es_correcta": false},
      {"id": "B", "texto": "El Interés Superior de la Niñez y el derecho al esparcimiento, descanso y alimentación.", "es_correcta": true},
      {"id": "C", "texto": "El reglamento interno de la cooperativa escolar.", "es_correcta": false},
      {"id": "D", "texto": "El derecho de los padres a decidir sobre la educación de sus hijos.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. El Interés Superior de la Niñez (Art. 4 Constitucional) prevalece sobre cualquier medida disciplinaria. Privar de alimentos o descanso vulnera derechos humanos básicos y afecta el desarrollo integral.",
    "fundamento_legal": "Constitución Política de los EUM, Art. 4. Ley General de los Derechos de NNA."
  },
  {
    "nivel": "General",
    "dominio": "Dominio 4: Gestión escolar",
    "tema": "Consejo Técnico Escolar (CTE)",
    "pregunta": "Durante la sesión del CTE, el colectivo docente se centra exclusivamente en organizar el festival del Día de las Madres y la kermés. ¿Es este el propósito del CTE? ¿Qué debería abordarse prioritariamente?",
    "opciones": [
      {"id": "A", "texto": "Sí, el CTE es para organizar eventos sociales y administrativos.", "es_correcta": false},
      {"id": "B", "texto": "No, el CTE debe centrarse en el máximo logro de aprendizajes, analizando datos, planeando mejoras pedagógicas y atendiendo problemáticas educativas.", "es_correcta": true},
      {"id": "C", "texto": "No, el CTE es exclusivamente para llenar formatos administrativos de la supervisión.", "es_correcta": false},
      {"id": "D", "texto": "Sí, siempre y cuando sobre tiempo después de desayunar.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. La misión del CTE es la mejora del servicio educativo enfocándose en el aprendizaje de los alumnos. Los asuntos sociales o administrativos son secundarios o deben tratarse en otros espacios.",
    "fundamento_legal": "Lineamientos para la organización y funcionamiento de los Consejos Técnicos Escolares."
  },
  {
    "nivel": "Secundaria",
    "dominio": "Dominio 3: Ambientes favorables",
    "tema": "Cultura de Paz",
    "pregunta": "En la asignatura de Formación Cívica y Ética, el docente propone analizar noticias sobre conflictos internacionales actuales. Los alumnos debaten acaloradamente. ¿Cuál es el rol del docente para fomentar una cultura de paz?",
    "opciones": [
      {"id": "A", "texto": "Prohibir el debate para evitar conflictos en el aula.", "es_correcta": false},
      {"id": "B", "texto": "Tomar partido por una postura y convencer a los alumnos de que es la correcta.", "es_correcta": false},
      {"id": "C", "texto": "Moderar el diálogo promoviendo la escucha activa, el respeto a la diversidad de opiniones y el análisis crítico de las fuentes de información.", "es_correcta": true},
      {"id": "D", "texto": "Dejar que discutan libremente sin intervenir para que aprendan a defenderse.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción C es correcta. La cultura de paz se construye a través del diálogo y el manejo pacífico de conflictos. El docente debe ser mediador y fomentar habilidades socioemocionales y pensamiento crítico.",
    "fundamento_legal": "Ley General de Educación, Art. 15 (Fines de la educación: Cultura de paz)."
  },
  {
    "nivel": "Primaria",
    "dominio": "Dominio 1: Marco Normativo",
    "tema": "Laicidad",
    "pregunta": "Una madre de familia solicita al docente que inicie las clases con una oración religiosa, argumentando que la mayoría del grupo profesa esa fe. ¿Cuál debe ser la respuesta del docente?",
    "opciones": [
      {"id": "A", "texto": "Acceder a la petición para respetar la democracia de la mayoría.", "es_correcta": false},
      {"id": "B", "texto": "Explicar respetuosamente que, conforme al Artículo 3°, la educación pública es laica, lo que garantiza el respeto a todas las creencias al mantenerse ajena a doctrina religiosa alguna.", "es_correcta": true},
      {"id": "C", "texto": "Realizar la oración pero pedir a los niños de otras religiones que salgan del salón.", "es_correcta": false},
      {"id": "D", "texto": "Sugerir que la oración se haga en el recreo.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. La laicidad es un principio fundamental que garantiza la libertad de creencias mediante la neutralidad de la escuela pública.",
    "fundamento_legal": "Artículo 3° Constitucional, Fracción I."
  },
  {
    "nivel": "Secundaria",
    "dominio": "Dominio 3: Práctica educativa",
    "tema": "Pensamiento Crítico",
    "pregunta": "¿Cuál de las siguientes actividades fomenta mejor el Eje Articulador de 'Pensamiento Crítico' en la Nueva Escuela Mexicana?",
    "opciones": [
      {"id": "A", "texto": "Pedir a los alumnos que memoricen las capitales de todos los países de América.", "es_correcta": false},
      {"id": "B", "texto": "Dictar un resumen sobre la Revolución Mexicana para que lo estudien para el examen.", "es_correcta": false},
      {"id": "C", "texto": "Analizar la publicidad de comida chatarra, identificando estereotipos y contrastando la información nutrimental con la realidad para tomar decisiones de consumo.", "es_correcta": true},
      {"id": "D", "texto": "Resolver ejercicios matemáticos mecanizados sin contexto.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción C es correcta. El pensamiento crítico implica analizar, cuestionar y valorar la información para tomar decisiones fundamentadas, trascendiendo la simple memorización.",
    "fundamento_legal": "Plan de Estudios 2022. Ejes Articuladores: Pensamiento Crítico."
  },
  {
    "nivel": "Telesecundaria",
    "dominio": "Dominio 4: Transformación social",
    "tema": "Vida Saludable",
    "pregunta": "En una comunidad con altos índices de diabetes, la escuela Telesecundaria decide implementar el eje de Vida Saludable. ¿Qué acción es congruente con este enfoque pedagógico?",
    "opciones": [
      {"id": "A", "texto": "Prohibir la venta de dulces dentro de la escuela pero permitirla en la entrada.", "es_correcta": false},
      {"id": "B", "texto": "Implementar un huerto escolar y talleres de cocina tradicional saludable, involucrando a las familias para revalorar la alimentación local.", "es_correcta": true},
      {"id": "C", "texto": "Dar pláticas teóricas sobre el plato del bien comer una vez al año.", "es_correcta": false},
      {"id": "D", "texto": "Obligar a los alumnos a correr 30 minutos diarios bajo el sol.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. Vida Saludable no es solo prohibir, sino generar hábitos conscientes y sostenibles, vinculando el aprendizaje con el contexto comunitario y la producción de alimentos.",
    "fundamento_legal": "Plan de Estudios 2022. Eje Articulador: Vida Saludable."
  },
  {
    "nivel": "Primaria",
    "dominio": "Dominio 2: Ambientes favorables",
    "tema": "Igualdad de Género",
    "pregunta": "El docente observa que en el recreo los niños ocupan toda la cancha de fútbol y las niñas quedan relegadas a las orillas. Al intervenir, algunos alumnos dicen 'el fútbol es de hombres'. ¿Qué debe hacer el docente?",
    "opciones": [
      {"id": "A", "texto": "Respetar la costumbre de los niños para no generar conflicto.", "es_correcta": false},
      {"id": "B", "texto": "Construir otra cancha solo para niñas.", "es_correcta": false},
      {"id": "C", "texto": "Intervenir pedagógicamente organizando roles rotativos y juegos mixtos, reflexionando sobre los estereotipos de género y el derecho de todos al uso del espacio.", "es_correcta": true},
      {"id": "D", "texto": "Prohibir el fútbol para todos.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción C es correcta. El docente debe promover la igualdad de género sustantiva, desnaturalizando estereotipos y garantizando el acceso equitativo a los espacios y actividades escolares.",
    "fundamento_legal": "Ley General de Educación. Fines de la educación: Igualdad de Género."
  },
  {
    "nivel": "General",
    "dominio": "Dominio 1: Marco Legal",
    "tema": "Excelencia Educativa",
    "pregunta": "La reforma al Artículo 3° de 2019 introdujo el concepto de 'Excelencia' en lugar de 'Calidad'. ¿Cómo se define la Excelencia educativa en este contexto?",
    "opciones": [
      {"id": "A", "texto": "Como el mejoramiento integral constante que promueve el máximo logro de aprendizaje de los educandos, para el desarrollo de su pensamiento crítico y el fortalecimiento de los lazos entre escuela y comunidad.", "es_correcta": true},
      {"id": "B", "texto": "Como obtener los puntajes más altos en pruebas estandarizadas internacionales como PISA.", "es_correcta": false},
      {"id": "C", "texto": "Como tener instalaciones escolares de lujo y tecnología de punta.", "es_correcta": false},
      {"id": "D", "texto": "Como la ausencia total de reprobación en la escuela.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción A es correcta. Es la definición textual plasmada en el Artículo 3°, enfatizando el proceso continuo, el pensamiento crítico y la comunidad, más allá de resultados numéricos.",
    "fundamento_legal": "Artículo 3° Constitucional, Fracción II inciso i."
  },
  {
    "nivel": "Primaria",
    "dominio": "Dominio 3: Práctica docente",
    "tema": "Planeación Didáctica",
    "pregunta": "Un docente planea sus actividades basándose únicamente en el libro de texto, página por página, sin considerar las características de su grupo ni el contexto local. ¿Qué elemento esencial de la planeación didáctica está omitiendo?",
    "opciones": [
      {"id": "A", "texto": "El uso de las TICs.", "es_correcta": false},
      {"id": "B", "texto": "El diagnóstico de grupo y la contextualización de los contenidos (codiseño).", "es_correcta": true},
      {"id": "C", "texto": "La revisión de tareas.", "es_correcta": false},
      {"id": "D", "texto": "La memorización de conceptos.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. La planeación debe partir de un diagnóstico real y del contexto (Programa Analítico), utilizando el libro de texto como un recurso de apoyo, no como el currículo único.",
    "fundamento_legal": "Marco para la Excelencia en la Enseñanza y la Gestión Escolar. Dominio 3."
  },
  {
    "nivel": "Secundaria",
    "dominio": "Dominio 1: Derechos Humanos",
    "tema": "Protocolo de revisión de mochilas",
    "pregunta": "Ante rumores de que un alumno trae un objeto peligroso, el director ordena revisar las mochilas de todos los estudiantes sin su consentimiento ni presencia de sus padres. ¿Es correcta esta acción?",
    "opciones": [
      {"id": "A", "texto": "Sí, la seguridad es primero.", "es_correcta": false},
      {"id": "B", "texto": "No, la SCJN ha determinado que las revisiones aleatorias o generalizadas sin consentimiento vulneran el derecho a la intimidad y presunción de inocencia. Se debe actuar con protocolos específicos y testigos.", "es_correcta": true},
      {"id": "C", "texto": "Sí, siempre y cuando lo hagan los maestros y no la policía.", "es_correcta": false},
      {"id": "D", "texto": "No, solo se debe revisar a los alumnos que parezcan sospechosos.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. Las medidas de 'Mochila Segura' deben ser consensuadas y respetar los derechos humanos. En caso de sospecha fundada, se debe llamar a los padres y autoridades competentes, no invadir la privacidad arbitrariamente.",
    "fundamento_legal": "Recomendaciones de la CNDH y criterios de la SCJN sobre el operativo Mochila Segura."
  },
  {
    "nivel": "Primaria",
    "dominio": "Dominio 3: Práctica docente",
    "tema": "Barreras para el Aprendizaje (BAP)",
    "pregunta": "Identifica cuál de los siguientes enunciados describe una BAP de tipo actitudinal:",
    "opciones": [
      {"id": "A", "texto": "La escuela tiene escaleras y no cuenta con rampas para sillas de ruedas.", "es_correcta": false},
      {"id": "B", "texto": "El docente piensa que los alumnos con discapacidad 'retrasan' al grupo y prefiere no incluirlos en actividades colaborativas.", "es_correcta": true},
      {"id": "C", "texto": "El alumno no cuenta con anteojos para ver el pizarrón.", "es_correcta": false},
      {"id": "D", "texto": "El libro de texto tiene letra muy pequeña.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. Las BAP actitudinales son prejuicios, bajas expectativas o rechazo por parte de la comunidad escolar que impiden la plena participación de los estudiantes.",
    "fundamento_legal": "Estrategia Nacional de Educación Inclusiva."
  },
  {
    "nivel": "General",
    "dominio": "Dominio 4: Colaboración",
    "tema": "Programa Escolar de Mejora Continua (PEMC)",
    "pregunta": "¿Qué característica define al PEMC?",
    "opciones": [
      {"id": "A", "texto": "Es un documento burocrático que hace el director solo.", "es_correcta": false},
      {"id": "B", "texto": "Es un instrumento multianual de planeación, dinámico y flexible, construido por el colectivo docente para atender las problemáticas prioritarias de la escuela.", "es_correcta": true},
      {"id": "C", "texto": "Es una lista de deseos de los padres de familia.", "es_correcta": false},
      {"id": "D", "texto": "Es el presupuesto financiero de la escuela.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. El PEMC es la hoja de ruta de la escuela, elaborado de manera colaborativa, con metas, acciones, responsables y seguimiento.",
    "fundamento_legal": "Lineamientos del Consejo Técnico Escolar. Orientaciones para elaborar el PEMC."
  },
  {
    "nivel": "Secundaria",
    "dominio": "Dominio 1: Principios",
    "tema": "Enfoque Humanista",
    "pregunta": "La Nueva Escuela Mexicana se fundamenta en un enfoque humanista. ¿Qué significa esto en la práctica docente diaria?",
    "opciones": [
      {"id": "A", "texto": "Dar clases de filosofía clásica.", "es_correcta": false},
      {"id": "B", "texto": "Ser permisivo y dejar que los alumnos hagan lo que quieran.", "es_correcta": false},
      {"id": "C", "texto": "Reconocer a las y los estudiantes como sujetos de derechos, con dignidad intrínseca, fomentando su desarrollo integral, emocional y cognitivo.", "es_correcta": true},
      {"id": "D", "texto": "Enfocarse solo en las asignaturas de Humanidades.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción C es correcta. El humanismo en la educación mexicana pone al estudiante y su dignidad al centro, buscando formar ciudadanos críticos, empáticos y comprometidos con su comunidad.",
    "fundamento_legal": "Ley General de Educación, Art. 11-14."
  },
  {
    "nivel": "Primaria",
    "dominio": "Dominio 2: Ambientes favorables",
    "tema": "Rezago Educativo",
    "pregunta": "Tras el diagnóstico inicial, la maestra de 3° detecta que 5 alumnos no han consolidado la lectoescritura. ¿Cuál es la estrategia de atención adecuada?",
    "opciones": [
      {"id": "A", "texto": "Recomendar a los padres que los cambien a una escuela de educación especial.", "es_correcta": false},
      {"id": "B", "texto": "Reprobarlos en el primer trimestre para que se esfuercen.", "es_correcta": false},
      {"id": "C", "texto": "Implementar un plan de atención focalizada con estrategias diferenciadas y material concreto, sin segregarlos del grupo, y dar seguimiento continuo a sus avances.", "es_correcta": true},
      {"id": "D", "texto": "Ignorar el problema y seguir con el programa de 3° grado.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción C es correcta. El docente debe atender el rezago mediante la diferenciación y el andamiaje pedagógico (ajuste a la enseñanza), garantizando el derecho a aprender de todos.",
    "fundamento_legal": "Normas de Control Escolar (Evaluación). Principios de Equidad e Inclusión."
  },
  // --- NUEVAS PREGUNTAS (21-40) ---
  {
    "nivel": "Telesecundaria",
    "dominio": "Dominio 3: Práctica educativa",
    "tema": "Aprendizaje Basado en Proyectos Comunitarios",
    "pregunta": "Un docente de Telesecundaria identifica que hay un problema de basura en la comunidad. Decide vincular contenidos de Biología y Ética mediante un proyecto donde los alumnos investiguen causas, propongan soluciones y realicen una campaña de limpieza. ¿Qué metodología activa está aplicando?",
    "opciones": [
      {"id": "A", "texto": "Método de casos.", "es_correcta": false},
      {"id": "B", "texto": "Aprendizaje Basado en Proyectos Comunitarios.", "es_correcta": true},
      {"id": "C", "texto": "Aprendizaje memorístico.", "es_correcta": false},
      {"id": "D", "texto": "Enseñanza directa.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. Esta metodología permite a los estudiantes situar el aprendizaje en un contexto real (problemática comunitaria), desarrollando pensamiento crítico y responsabilidad social, pilares de la NEM.",
    "fundamento_legal": "Plan de Estudios 2022. Metodologías Sociocríticas."
  },
  {
    "nivel": "Primaria",
    "dominio": "Dominio 3: Práctica educativa",
    "tema": "Campo Formativo: Saberes y Pensamiento Científico",
    "pregunta": "Al trabajar el tema de las plantas, el docente pide a los alumnos que observen, midan el crecimiento, registren datos y comparen resultados. ¿Qué campo formativo se está favoreciendo principalmente?",
    "opciones": [
      {"id": "A", "texto": "Lenguajes.", "es_correcta": false},
      {"id": "B", "texto": "De lo Humano y lo Comunitario.", "es_correcta": false},
      {"id": "C", "texto": "Saberes y Pensamiento Científico.", "es_correcta": true},
      {"id": "D", "texto": "Ética, Naturaleza y Sociedades.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción C es correcta. Este campo integra las ciencias naturales y las matemáticas, promoviendo la indagación, la observación sistemática y el pensamiento lógico-matemático para comprender el entorno.",
    "fundamento_legal": "Plan de Estudios 2022. Campos Formativos."
  },
  {
    "nivel": "Secundaria",
    "dominio": "Dominio 1: Principios Filosóficos",
    "tema": "Autonomía Profesional del Magisterio",
    "pregunta": "La supervisión escolar indica que todos los docentes deben usar obligatoriamente la misma planeación estandarizada. Un colectivo docente argumenta que esto contraviene su derecho a decidir sobre su práctica pedagógica según su contexto. ¿A qué concepto se refieren?",
    "opciones": [
      {"id": "A", "texto": "Libertad de expresión.", "es_correcta": false},
      {"id": "B", "texto": "Autonomía Profesional del Magisterio.", "es_correcta": true},
      {"id": "C", "texto": "Insubordinación laboral.", "es_correcta": false},
      {"id": "D", "texto": "Derecho de huelga.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. La NEM reconoce la autonomía profesional de los maestros para contextualizar contenidos (codiseño) y elegir las estrategias didácticas más pertinentes para su grupo, siempre basándose en el currículo nacional.",
    "fundamento_legal": "Plan de Estudios 2022. Autonomía Profesional."
  },
  {
    "nivel": "Primaria",
    "dominio": "Dominio 3: Práctica educativa",
    "tema": "Retroalimentación Formativa",
    "pregunta": "Un alumno entrega un texto con varios errores ortográficos. ¿Cuál es la retroalimentación formativa más adecuada?",
    "opciones": [
      {"id": "A", "texto": "Poner una 'X' grande en rojo y escribir 'Repetir 10 veces'.", "es_correcta": false},
      {"id": "B", "texto": "Asignar una calificación de 6 sin comentarios.", "es_correcta": false},
      {"id": "C", "texto": "Señalar los errores y preguntarle: '¿Cómo podrías escribir estas palabras para que se entiendan mejor? Revisa tu diccionario', invitándolo a la reflexión y autocorrección.", "es_correcta": true},
      {"id": "D", "texto": "Corregirle todo el texto para que vea cómo se hace.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción C es correcta. La retroalimentación formativa debe ser descriptiva y orientadora, promoviendo que el alumno identifique sus áreas de oportunidad y sepa cómo mejorar, en lugar de solo sancionar el error.",
    "fundamento_legal": "Enfoque formativo de la evaluación."
  },
  {
    "nivel": "Telesecundaria",
    "dominio": "Dominio 4: Transformación social",
    "tema": "Uso de Recursos Tecnológicos",
    "pregunta": "En una Telesecundaria, la señal satelital falla frecuentemente. El docente decide descargar previamente los videos y buscar recursos interactivos offline en tabletas. ¿Qué criterio del perfil docente está cumpliendo?",
    "opciones": [
      {"id": "A", "texto": "Organiza el funcionamiento de la escuela.", "es_correcta": false},
      {"id": "B", "texto": "Utiliza recursos y materiales diversos (tecnológicos) acordes al contexto para favorecer el aprendizaje.", "es_correcta": true},
      {"id": "C", "texto": "Conoce a sus alumnos.", "es_correcta": false},
      {"id": "D", "texto": "Se vincula con la comunidad.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. El docente de Telesecundaria debe ser capaz de gestionar y adaptar los recursos tecnológicos disponibles para garantizar la continuidad del aprendizaje, superando las brechas digitales del contexto.",
    "fundamento_legal": "Marco para la Excelencia (Dominio 3)."
  },
  {
    "nivel": "Primaria",
    "dominio": "Dominio 2: Ambientes favorables",
    "tema": "Desarrollo Socioemocional",
    "pregunta": "Juanito, de 2° grado, se frustra y llora cuando no gana en los juegos. ¿Qué acción docente favorece su desarrollo socioemocional?",
    "opciones": [
      {"id": "A", "texto": "Sacarlo del juego para que no moleste a los demás.", "es_correcta": false},
      {"id": "B", "texto": "Decirle 'los niños grandes no lloran'.", "es_correcta": false},
      {"id": "C", "texto": "Validar su emoción, dialogar con él sobre la tolerancia a la frustración y enseñarle estrategias de respiración o tiempo fuera positivo.", "es_correcta": true},
      {"id": "D", "texto": "Dejarlo ganar siempre para que esté feliz.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción C es correcta. La educación socioemocional busca que los niños reconozcan, validen y regulen sus emociones. El docente debe proveer herramientas para la autorregulación y la convivencia.",
    "fundamento_legal": "Plan de Estudios 2022. Campo: De lo Humano y lo Comunitario."
  },
  {
    "nivel": "Secundaria",
    "dominio": "Dominio 1: Marco Normativo",
    "tema": "Acreditación y Asistencia",
    "pregunta": "Según las normas de control escolar vigentes, ¿se puede reprobar a un alumno de secundaria únicamente por inasistencias si ha demostrado los aprendizajes esperados?",
    "opciones": [
      {"id": "A", "texto": "Sí, la asistencia es el 80% de la calificación.", "es_correcta": false},
      {"id": "B", "texto": "No, el criterio principal es el logro de los aprendizajes. Las inasistencias deben atenderse buscando las causas y previniendo el abandono, no como medida punitiva única.", "es_correcta": true},
      {"id": "C", "texto": "Sí, es parte de la disciplina escolar.", "es_correcta": false},
      {"id": "D", "texto": "Depende del reglamento interno de cada escuela.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. La tendencia normativa actual prioriza la evaluación del aprendizaje sobre criterios administrativos rígidos, buscando siempre la permanencia del estudiante en el sistema.",
    "fundamento_legal": "Normas Específicas de Control Escolar (Acuerdos de Evaluación vigentes)."
  },
  {
    "nivel": "General",
    "dominio": "Dominio 1: Principios",
    "tema": "Educación Integral",
    "pregunta": "La Ley General de Educación establece que la educación debe ser 'Integral'. ¿Qué implica este concepto?",
    "opciones": [
      {"id": "A", "texto": "Que se den clases de tiempo completo.", "es_correcta": false},
      {"id": "B", "texto": "Que eduque para la vida, desarrollando todas las capacidades humanas: cognitivas, físicas, emocionales, éticas, cívicas y estéticas.", "es_correcta": true},
      {"id": "C", "texto": "Que integre a alumnos de diferentes grados en un solo salón.", "es_correcta": false},
      {"id": "D", "texto": "Que se enseñen muchas materias.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. La educación integral busca formar al ser humano en todas sus dimensiones, no solo en la académica o intelectual.",
    "fundamento_legal": "Ley General de Educación, Art. 18."
  },
  {
    "nivel": "Primaria",
    "dominio": "Dominio 2: Inclusión",
    "tema": "Trastorno del Espectro Autista (TEA)",
    "pregunta": "Un alumno con TEA presenta crisis sensoriales ante ruidos fuertes como el timbre del recreo. ¿Qué ajuste razonable debe implementar la escuela?",
    "opciones": [
      {"id": "A", "texto": "Eliminar el timbre para toda la escuela.", "es_correcta": false},
      {"id": "B", "texto": "Permitir que el alumno salga unos minutos antes del timbre o use audífonos canceladores de ruido, y anticiparle los cambios de actividad.", "es_correcta": true},
      {"id": "C", "texto": "Obligarlo a escuchar el timbre para que se acostumbre (desensibilización forzada).", "es_correcta": false},
      {"id": "D", "texto": "Darle clases en la biblioteca para siempre.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. Los ajustes razonables son adaptaciones específicas que facilitan la participación. Anticipar rutinas y reducir estímulos aversivos son estrategias clave para alumnos con TEA.",
    "fundamento_legal": "Ley General para la Inclusión de las Personas con Discapacidad."
  },
  {
    "nivel": "Secundaria",
    "dominio": "Dominio 3: Práctica educativa",
    "tema": "Tutoría y Educación Socioemocional",
    "pregunta": "¿Cuál es el propósito principal de la hora de Tutoría en Educación Secundaria?",
    "opciones": [
      {"id": "A", "texto": "Dar tiempo libre a los alumnos para que hagan tarea de otras materias.", "es_correcta": false},
      {"id": "B", "texto": "Acompañar a los estudiantes en su proceso de inserción a la dinámica escolar, dar seguimiento a su desempeño académico y favorecer su desarrollo socioemocional.", "es_correcta": true},
      {"id": "C", "texto": "Repasar contenidos de Matemáticas y Español.", "es_correcta": false},
      {"id": "D", "texto": "Organizar la limpieza del salón.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. La tutoría es un espacio curricular de acompañamiento y gestión de emociones, no una asignatura académica ni una hora libre.",
    "fundamento_legal": "Lineamientos para la formación y atención de los adolescentes (Tutoría)."
  },
  {
    "nivel": "Telesecundaria",
    "dominio": "Dominio 4: Vinculación",
    "tema": "Proyectos Productivos",
    "pregunta": "Para fortalecer la relación escuela-comunidad, el maestro de Telesecundaria propone un proyecto de 'Huerto Comunitario Sustentable'. ¿Qué aprendizaje promueve esta actividad?",
    "opciones": [
      {"id": "A", "texto": "Solo aprendizajes de agricultura.", "es_correcta": false},
      {"id": "B", "texto": "Aprendizajes situados que integran saberes locales, científicos, tecnológicos y éticos, promoviendo el desarrollo sustentable de la comunidad.", "es_correcta": true},
      {"id": "C", "texto": "La mano de obra barata de los estudiantes.", "es_correcta": false},
      {"id": "D", "texto": "El cumplimiento de horas de servicio social.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. Los proyectos productivos en Telesecundaria son una excelente vía para contextualizar el currículo y demostrar la utilidad social del conocimiento.",
    "fundamento_legal": "Plan de Estudios 2022. Eje: Vida Saludable y Pensamiento Crítico."
  },
  {
    "nivel": "Primaria",
    "dominio": "Dominio 3: Práctica educativa",
    "tema": "Alfabetización Inicial",
    "pregunta": "Para enseñar a leer y escribir en 1° grado, el docente evita las planas de letras aisladas ('ma, me, mi...') y prefiere trabajar con el nombre propio de los niños y etiquetas de objetos del salón. ¿Bajo qué enfoque está trabajando?",
    "opciones": [
      {"id": "A", "texto": "Método Onomatopéyico.", "es_correcta": false},
      {"id": "B", "texto": "Prácticas Sociales del Lenguaje (Enfoque Comunicativo y Funcional).", "es_correcta": true},
      {"id": "C", "texto": "Método Silábico estricto.", "es_correcta": false},
      {"id": "D", "texto": "Método Ecléctico.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. El enfoque vigente busca que los niños comprendan la función social de la escritura y el sistema de escritura a través de textos reales y significativos, no mediante la mecanización sin sentido.",
    "fundamento_legal": "Programas de Estudio (Campo: Lenguajes)."
  },
  {
    "nivel": "Secundaria",
    "dominio": "Dominio 3: Práctica educativa",
    "tema": "Pensamiento Histórico",
    "pregunta": "En la clase de Historia, el docente pide a los alumnos que comparen dos fuentes primarias (una carta y una nota periodística) sobre un mismo hecho histórico que se contradicen. ¿Qué habilidad está desarrollando?",
    "opciones": [
      {"id": "A", "texto": "La memorización de fechas.", "es_correcta": false},
      {"id": "B", "texto": "El pensamiento histórico y el análisis crítico de fuentes.", "es_correcta": true},
      {"id": "C", "texto": "La lectura en voz alta.", "es_correcta": false},
      {"id": "D", "texto": "El patriotismo acrítico.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. La enseñanza de la Historia debe superar la 'historia de bronce' (héroes y fechas) para formar conciencia histórica mediante el análisis, la multicausalidad y la interpretación de evidencias.",
    "fundamento_legal": "Plan de Estudios 2022. Campo: Ética, Naturaleza y Sociedades."
  },
  {
    "nivel": "General",
    "dominio": "Dominio 1: Derechos Humanos",
    "tema": "Dignidad Humana",
    "pregunta": "Un docente hace comentarios sarcásticos sobre la apariencia física de un alumno frente al grupo para 'hacerlos reír'. ¿Qué derecho fundamental está vulnerando?",
    "opciones": [
      {"id": "A", "texto": "Derecho a la educación.", "es_correcta": false},
      {"id": "B", "texto": "Derecho a la dignidad humana y al trato respetuoso, libre de violencia.", "es_correcta": true},
      {"id": "C", "texto": "Derecho a la libertad de expresión.", "es_correcta": false},
      {"id": "D", "texto": "Derecho de asociación.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. La dignidad humana es el valor supremo. El maltrato psicológico o la humillación por parte de una autoridad escolar es una falta grave que atenta contra la integridad del NNA.",
    "fundamento_legal": "Constitución Política (Art. 1). Ley General de los Derechos de NNA."
  },
  {
    "nivel": "Primaria",
    "dominio": "Dominio 3: Práctica educativa",
    "tema": "Resolución de Problemas Matemáticos",
    "pregunta": "En Matemáticas, el docente plantea un problema: 'Si quiero repartir 20 dulces entre 4 amigos, ¿cuántos le tocan a cada uno?'. Un niño lo resuelve dibujando los dulces y repartiéndolos con flechas, sin usar la división formal. ¿Cómo debe actuar el docente?",
    "opciones": [
      {"id": "A", "texto": "Calificarlo mal porque no usó el algoritmo de la división.", "es_correcta": false},
      {"id": "B", "texto": "Validar su estrategia no convencional, socializarla con el grupo y usarla como puente para explicar posteriormente el algoritmo convencional.", "es_correcta": true},
      {"id": "C", "texto": "Decirle que deje de hacer dibujos porque ya está grande.", "es_correcta": false},
      {"id": "D", "texto": "Ignorarlo.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. El enfoque de resolución de problemas valora los procedimientos propios de los alumnos. El algoritmo es una herramienta que se construye, no un punto de partida impuesto.",
    "fundamento_legal": "Enfoque pedagógico del Pensamiento Matemático."
  },
  {
    "nivel": "Secundaria",
    "dominio": "Dominio 3: Práctica educativa",
    "tema": "Educación Física y Corporeidad",
    "pregunta": "En Educación Física, el docente se enfoca en que los alumnos reflexionen sobre cómo se sienten al moverse, reconozcan sus límites y respeten a los demás en el juego, en lugar de solo medir quién corre más rápido. ¿Qué concepto está trabajando?",
    "opciones": [
      {"id": "A", "texto": "Deporte de alto rendimiento.", "es_correcta": false},
      {"id": "B", "texto": "Corporeidad.", "es_correcta": true},
      {"id": "C", "texto": "Militarización.", "es_correcta": false},
      {"id": "D", "texto": "Recreo dirigido.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. La Corporeidad es la integración de lo físico, emocional y social. La Educación Física en la escuela básica es educativa y formativa, no solo adiestramiento deportivo.",
    "fundamento_legal": "Plan de Estudios 2022. Campo: De lo Humano y lo Comunitario."
  },
  {
    "nivel": "Telesecundaria",
    "dominio": "Dominio 3: Práctica educativa",
    "tema": "Aprendizaje Colaborativo",
    "pregunta": "En un aula multigrado de Telesecundaria, el docente organiza equipos donde los alumnos de 3° grado apoyan a los de 1° a comprender un tema. ¿Qué beneficio tiene esta estrategia?",
    "opciones": [
      {"id": "A", "texto": "El maestro trabaja menos.", "es_correcta": false},
      {"id": "B", "texto": "Fomenta el andamiaje (ZDP), la solidaridad y refuerza el aprendizaje de los mayores al tener que explicarlo (aprender enseñando).", "es_correcta": true},
      {"id": "C", "texto": "Genera desorden.", "es_correcta": false},
      {"id": "D", "texto": "Retrasa a los alumnos de 3°.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. El aprendizaje colaborativo y la tutoría entre pares son estrategias potentes, especialmente en contextos multigrado, aprovechando la diversidad de niveles para el aprendizaje mutuo.",
    "fundamento_legal": "Teoría Sociocultural (Vigotsky) aplicada en el Modelo Educativo."
  },
  {
    "nivel": "General",
    "dominio": "Dominio 1: Fines de la educación",
    "tema": "Nueva Escuela Mexicana",
    "pregunta": "¿Cuál es el objetivo central de la Nueva Escuela Mexicana?",
    "opciones": [
      {"id": "A", "texto": "Formar mano de obra calificada para las empresas extranjeras.", "es_correcta": false},
      {"id": "B", "texto": "El desarrollo humano integral del educando, reorientando el Sistema Educativo Nacional para incidir en la cultura educativa mediante la corresponsabilidad y promover la transformación social.", "es_correcta": true},
      {"id": "C", "texto": "Privatizar la educación.", "es_correcta": false},
      {"id": "D", "texto": "Eliminar los libros de texto.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. La NEM busca transformar la sociedad desde la escuela, formando ciudadanos críticos, participativos y con identidad nacional.",
    "fundamento_legal": "Acuerdo Educativo Nacional (NEM)."
  },
  {
    "nivel": "Primaria",
    "dominio": "Dominio 4: Gestión y Seguridad",
    "tema": "Protección Civil",
    "pregunta": "Durante un simulacro de sismo, un alumno entra en pánico y se niega a salir. ¿Cuál es la acción correcta del docente encargado?",
    "opciones": [
      {"id": "A", "texto": "Gritarle para que reaccione y jalarlo hacia la salida.", "es_correcta": false},
      {"id": "B", "texto": "Dejarlo ahí y salir con el resto del grupo para salvar a la mayoría.", "es_correcta": false},
      {"id": "C", "texto": "Mantener la calma, acercarse a él, contenerlo verbalmente y guiarlo con firmeza y seguridad hacia la zona de menor riesgo, siguiendo el protocolo de repliegue si es necesario.", "es_correcta": true},
      {"id": "D", "texto": "Cargarlo a la fuerza aunque patalee.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción C es correcta. La seguridad emocional es tan importante como la física. El docente debe actuar como líder de protección civil, garantizando la evacuación sin poner en riesgo la integridad de nadie.",
    "fundamento_legal": "Protocolos de Protección Civil Escolar."
  },
  {
    "nivel": "Secundaria",
    "dominio": "Dominio 1: Marco Legal",
    "tema": "Educación Sexual Integral",
    "pregunta": "Un grupo de padres exige que no se impartan temas de sexualidad en Biología. El docente, basándose en la ley, explica que:",
    "opciones": [
      {"id": "A", "texto": "Tienen razón, esos temas se ven en casa.", "es_correcta": false},
      {"id": "B", "texto": "La educación sexual es un derecho de los NNA y un contenido obligatorio de los planes de estudio para favorecer el ejercicio responsable de la sexualidad, la planeación familiar y la prevención de enfermedades.", "es_correcta": true},
      {"id": "C", "texto": "Solo dará el tema si todos los padres firman un permiso.", "es_correcta": false},
      {"id": "D", "texto": "Dará el tema a escondidas de los padres.", "es_correcta": false}
    ],
    "retroalimentacion": "La opción B es correcta. El Artículo 3° y la Ley General de Educación establecen que la educación será integral e incluirá la educación sexual y reproductiva. No es opcional ni sujeta a veto parental (Pin Parental).",
    "fundamento_legal": "Artículo 3° Constitucional, Fracción V. Ley General de Educación."
  }
];
const timelineContainer = document.getElementById('timeline');
const yearPanelsContainer = document.getElementById('year-panels');
const startYear = 1940;
const endYear = 2025;

// Agrupar los años por décadas
const decades = {};
for (let year = startYear; year <= endYear; year++) {
    const decade = Math.floor(year / 10) * 10; // Redondear al inicio de la década
    if (!decades[decade]) {
        decades[decade] = [];
    }
    decades[decade].push(year);
}

// Crear botones para las décadas
const decadeKeys = Object.keys(decades);
const totalDecades = decadeKeys.length;

// Total de botones: las décadas + el botón especial de 1939
const totalButtons = totalDecades + 1;

// Espaciado proporcional entre los botones (reducimos el ancho total utilizado)
const spacing = 90 / totalButtons; // Ajustado para que el total sea menos del 100%
const offset = 5; // Ajustamos el desplazamiento hacia la derecha

// Crear un botón especial para el año 1939
const specialYearButton = document.createElement('button');
specialYearButton.classList.add('timeline-decade');
specialYearButton.textContent = '1939';
specialYearButton.setAttribute('aria-expanded', false);

// Posicionar el botón de 1939 en el inicio de la línea de tiempo, con el desplazamiento añadido
specialYearButton.style.left = `${offset}%`;
timelineContainer.appendChild(specialYearButton);

specialYearButton.addEventListener('click', () => {
    // Eliminar cualquier panel de meses activo
    const existingMonthPanel = document.querySelector(`#month-panel-1939`);
    if (existingMonthPanel) {
        existingMonthPanel.remove(); // Eliminar el panel existente
    }

    // Crear un nuevo panel de meses para 1939
    const monthPanel = document.createElement('div');
    monthPanel.classList.add('month-panel');
    monthPanel.id = `month-panel-1939`;

    // Crear botones para los meses de mayo a diciembre
    const months = ["Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    months.forEach((month, index) => {
        const monthButton = document.createElement('button');
        monthButton.classList.add('timeline-month');
        monthButton.textContent = month;
        monthButton.dataset.month = month;

        // Asociar una imagen y panel de texto a cada mes
        monthButton.addEventListener('click', () => {
            // Primero, ocultar cualquier contenido activo
            document.querySelectorAll('.month-content').forEach(content => content.style.display = 'none');

            // Mostrar la imagen y el contenido del mes seleccionado
            const monthContentId = `content-1939-${month.toLowerCase()}`;
            const selectedMonthContent = document.getElementById(monthContentId);
            if (selectedMonthContent) {
                selectedMonthContent.style.display = 'block'; // Mostrar la imagen y panel de texto
            }

            // Marcar el mes activo
            document.querySelectorAll('.timeline-month').forEach(button => button.classList.remove('active-month'));
            monthButton.classList.add('active-month');
        });

        monthPanel.appendChild(monthButton);
    });

    // Agregar el panel de meses al contenedor
    yearPanelsContainer.appendChild(monthPanel);

    // Mostrar el panel de meses
    monthPanel.classList.add('active');
});

// Crear botones para las décadas a partir de 1940
decadeKeys.forEach((decade, index) => {
    // Crear botón para la década
    const decadeButton = document.createElement('button');
    decadeButton.classList.add('timeline-decade');
    decadeButton.textContent = `${decade}s`;

    // Posicionamos los botones de las décadas con el espaciado reducido
    const leftPosition = spacing * (index + 1) + offset;  // Ajustamos para que el primer botón de década comience después de 1939
    decadeButton.style.left = `${leftPosition}%`;

    timelineContainer.appendChild(decadeButton);

    // Crear el panel de años para la década
    const yearPanel = document.createElement('div');
    yearPanel.classList.add('year-panel');
    yearPanel.id = `panel-${decade}`;

    // Crear botones para los años de la década
    decades[decade].forEach(year => {
        const yearButton = document.createElement('button');
        yearButton.classList.add('timeline-year');
        yearButton.textContent = year;
        yearButton.dataset.year = year;
        yearPanel.appendChild(yearButton);

        // Funcionalidad para mostrar contenido de los años
        yearButton.addEventListener('click', () => {
            const contents = document.querySelectorAll('.content');
            const contentId = `content-${year}`;
            const selectedContent = document.getElementById(contentId);
            contents.forEach(content => content.classList.remove('active'));
            if (selectedContent) {
                selectedContent.classList.add('active');
            }

            document.querySelectorAll('.timeline-year').forEach(button => button.classList.remove('active-year'));
            yearButton.classList.add('active-year');

            // Mostrar panel de meses
            showMonthPanel(year);
        });
    });

    yearPanelsContainer.appendChild(yearPanel);

    // Funcionalidad para desplegar/cerrar el panel de la década
    decadeButton.addEventListener('click', () => {
        const allPanels = document.querySelectorAll('.year-panel');
        const isExpanded = yearPanel.classList.contains('active');
        allPanels.forEach(panel => panel.classList.remove('active'));
        document.querySelectorAll('.timeline-decade').forEach(button => button.setAttribute('aria-expanded', false));
        if (!isExpanded) {
            yearPanel.classList.add('active');
            decadeButton.setAttribute('aria-expanded', true);
        }
        document.querySelectorAll('.timeline-decade').forEach(button => button.classList.remove('active-decade'));
        decadeButton.classList.add('active-decade');
    });
});

// Función para mostrar el panel de meses
function showMonthPanel(year) {
    // Eliminar cualquier panel de meses activo
    const existingMonthPanel = document.querySelector(`#month-panel-${year}`);
    if (existingMonthPanel) {
        existingMonthPanel.remove(); // Eliminar el panel existente
    }

    // Crear un nuevo panel de meses para el año seleccionado
    const monthPanel = document.createElement('div');
    monthPanel.classList.add('month-panel');
    monthPanel.id = `month-panel-${year}`;

    // Crear botones para cada mes
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    months.forEach((month, index) => {
        const monthButton = document.createElement('button');
        monthButton.classList.add('timeline-month');
        monthButton.textContent = month;
        monthButton.dataset.month = month;

        // Asociar una imagen y panel de texto a cada mes
        monthButton.addEventListener('click', () => {
            // Primero, ocultar cualquier contenido activo
            document.querySelectorAll('.month-content').forEach(content => content.style.display = 'none');

            // Ahora, mostrar la imagen y contenido del mes seleccionado
            const monthContentId = `content-${year}-${month.toLowerCase()}`;
            const selectedMonthContent = document.getElementById(monthContentId);
            if (selectedMonthContent) {
                selectedMonthContent.style.display = 'block'; // Mostrar la imagen y panel de texto
            }

            // Marcar el mes activo
            document.querySelectorAll('.timeline-month').forEach(button => button.classList.remove('active-month'));
            monthButton.classList.add('active-month');
        });

        monthPanel.appendChild(monthButton);
    });

    // Agregar el panel de meses al contenedor
    yearPanelsContainer.appendChild(monthPanel);

    // Mostrar el panel de meses
    monthPanel.classList.add('active');
}

// Detectar clics fuera de los paneles para cerrarlos
document.addEventListener('click', (event) => {
    const yearPanels = document.querySelectorAll('.year-panel');
    const monthPanels = document.querySelectorAll('.month-panel');
    const isClickInsideYearPanel = Array.from(yearPanels).some(panel => panel.contains(event.target));
    const isClickInsideMonthPanel = Array.from(monthPanels).some(panel => panel.contains(event.target));
    const isClickOnDecadeOrYearButton = event.target.classList.contains('timeline-decade') || event.target.classList.contains('timeline-year');

    if (!isClickInsideYearPanel && !isClickInsideMonthPanel && !isClickOnDecadeOrYearButton) {
        yearPanels.forEach(panel => panel.classList.remove('active'));
        document.querySelectorAll('.timeline-decade').forEach(button => button.classList.remove('active-decade'));
        document.querySelectorAll('.timeline-decade').forEach(button => button.setAttribute('aria-expanded', false));
        monthPanels.forEach(panel => panel.classList.remove('active'));
    }
});



//Ok, te cuento, mi pagina web es una linea de ltiempo interactiva, tocas en un boton de "decada" y 
// te muestra los años, luego cuando haces click en un boton de "año" te muestra los meses, cuando 
// haces click en un boton de "mes" te muestra una foto ubicada en la parte de abajo. Cada boton crea 
// un panel con los siguientes botones
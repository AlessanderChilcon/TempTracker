// Tu API Key integrada directamente
const claveApi = "02cf9b3fcbf142f2bcc03842262109";
const idioma = 'es';

const inpCiudad = document.getElementById('input-ciudad');
const divError = document.getElementById('error-mensaje');

// Permitir buscar presionando la tecla "Enter" en el input
inpCiudad.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        obtenerClima();
    }
});

async function obtenerClima() {
    const ciudad = inpCiudad.value.trim();
    
    if (!ciudad) {
        mostrarError('Por favor, ingresa el nombre de una ciudad.');
        return;
    }

    // Ocultar error previo si lo había
    divError.classList.add('oculto');

    // URL usando comillas invertidas (` `) para interpretar las variables de manera correcta
    const apiClimaActual = `https://api.weatherapi.com/v1/current.json?q=${ciudad}&lang=${idioma}&key=${claveApi}`;

    try {
        const response = await fetch(apiClimaActual);
        
        if (!response.ok) {
            throw new Error('Ciudad no encontrada');
        }

        const data = await response.json();
        mostrarDatosClima(data);

    } catch (error) {
        console.error(error);
        mostrarError('No se pudo encontrar la ciudad o falló la conexión.');
    }
}

function mostrarDatosClima(data) {
    const iconoUrl = data.current.condition.icon;
    const temperatura = data.current.temp_c;
    const nombreCiudad = data.location.name;
    const pais = data.location.country;
    const condicionTexto = data.current.condition.text;
    const humedadPorcentaje = data.current.humidity;
    const vientoKph = data.current.wind_kph;

    // Actualizar elementos en el HTML
    document.querySelector('.clima-icono').src = `https:${iconoUrl}`;
    document.querySelector('.temp').textContent = `${temperatura}°C`;
    document.querySelector('.ciudad').textContent = `${nombreCiudad}, ${pais}`;
    document.querySelector('.clima-texto').textContent = condicionTexto;
    document.querySelector('.humedad').textContent = `${humedadPorcentaje}%`;
    document.querySelector('.viento').textContent = `${vientoKph} km/h`;
}

function mostrarError(mensaje) {
    divError.textContent = mensaje;
    divError.classList.remove('oculto');
    
    // Limpiar campos visuales en caso de error
    document.querySelector('.clima-icono').src = '';
    document.querySelector('.temp').textContent = '--°C';
    document.querySelector('.ciudad').textContent = 'Ciudad no hallada';
    document.querySelector('.clima-texto').textContent = '---';
    document.querySelector('.humedad').textContent = '--%';
    document.querySelector('.viento').textContent = '-- km/h';
}
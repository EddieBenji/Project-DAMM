/**
 * Created by lalo on 14/10/15.
 */


/**
 * Esta variable sirve para guardar la información del acelerómetro.
 * @type {accelerometer}
 */
var accelerometerWatchID = null, data;

/**
 * Esta función inicializa el acelerómetro, al establecer que cada medio segundo, dispositivo estará
 * censando los ejes "x" y "y".
 */
function startAccelerometer() {

    //esta variable es la que manipula el DOM, donde se mostrará la información del podómetro
    data = document.getElementById("data-for-pedometer");
    //Hacemos que aparezca el div (Estaba oculto)
    data.style.display = "block";

    //Establecemos que c/medio segundo haremos el censado de los ejes.
    var options = {
        frequency: 500
    };
    //Censamos el acelerómetro. Si el celular lee correctamente,
    // nos vamos a la función onSuccessAccelerometer()
    accelerometerWatchID = navigator.accelerometer.watchAcceleration(onSuccessAccelerometer,
        onErrorAccelerometer,
        options);
}
/**
 * Estas variables son las necesarias para llevar a cabo un pequeño algoritmo en el conteo de pasos.
 * @type {number}
 */

var previousPosition_y = 0,
    currentPosition_y = 0,
    previousPosition_x = 0,
    currentPosition_x = 0,
    differential = 0.5,
    threshold = 0.7;

/**
 * Estas "banderas" sirven para saber si el usuario ha hecho un movimiento.
 * (Se considera que se ha dado un paso, si ha habido
 * un movimiento en el eje "x" y en el eje "y")
 * @type {boolean}
 */
var has_moved_on_x = false,
    has_moved_on_y = false;

/**
 * La variable steps, es la que mantiene el conteo de la cantidad de pasos dados.
 * La variable calories, es la que mantiene el conteo de las calorías quemadas, por los pasos dados.
 * Las variables showSteps y showCalories, manipulan el DOM
 * para mostrar la información de las variables anteriores.
 * @type {number}
 */
var steps = 0, calories = 0, showSteps, showCalories;

/**
 * Esta función es la que maneja el algoritmo del conteo de pasos.
 * @param acceleration
 */
function onSuccessAccelerometer(acceleration) {
    //Variables que manipulan el DOM:
    showSteps = document.getElementById('accelerometer');
    showCalories = document.getElementById('calories');

    //Obtenemos la lectura del acelerómetro en los ejes "x" y "y"
    currentPosition_x = acceleration.x;
    currentPosition_y = acceleration.y;

    //Si la lectura en x, es menor que la lectura anterior +- un diferencial:
    if (currentPosition_x <= (previousPosition_x - differential) ||
        currentPosition_x >= (previousPosition_x + differential))
        has_moved_on_x = true;

    //Primero preguntamos si hubo un movimiento significativo en "x", luego,
    // Vemos si la lectura en y, es menor que la lectura anterior +- un diferencial:
    if (has_moved_on_x)
        if (currentPosition_y <= previousPosition_y - differential ||
            currentPosition_y >= previousPosition_y + differential)
            has_moved_on_y = true;

    //Si se ha movido tanto en "x" como en "y" y, además,
    // la posición actual menos la anterior es mayor a un límite.
    //Este límite se considera, como si fuera otra verificación para decir que efectivamente
    //se ha dado un paso
    if (has_moved_on_x && has_moved_on_y &&
        Math.abs(currentPosition_x - previousPosition_x) > threshold &&
        Math.abs(currentPosition_y - previousPosition_y) > threshold) {
        //Aumentamos los pasos:
        steps++;

        //Obtenemos las calorías quemadas:
        calories = parseFloat(Math.round(.041 * steps * 100) / 100).toFixed(2);

        //mostramos los pasos en el html
        showSteps.innerHTML = steps;
        //mostramos las calorías en el html
        showCalories.innerHTML = calories;

        //Reiniciamos las banderas que indican si se movió el usuario
        has_moved_on_x = false;
        has_moved_on_y = false;
    }

    //actualizamos la posición anterior a la actual. (Tanto en "x" como en "y"):
    previousPosition_x = currentPosition_x;
    previousPosition_y = currentPosition_y;
}

/**
 * Si el celular falló en la lectura del acelerómetro, muestra el mensaje de error.
 */
function onErrorAccelerometer() {
    alert('¡Error!');
}

/**
 * Esta función es llamada cuando se reinicia el acelerómetro.
 * Lo que hace es dejar de censar, y reiniciar el censador.
 */
function stopWatchAccelerometer() {
    if (accelerometerWatchID != null) {
        navigator.accelerometer.clearWatch(accelerometerWatchID);
        accelerometerWatchID = null;

        reset_variables_and_fields();
    }
}

/**
 * El objetivo de esta función es ocultar de nuevo el div que muestra la información
 * de los pasos y las calorías, así como reiniciar (a su estado original), todas las
 * variables que se usaron.
 */
function reset_variables_and_fields() {
    data.style.display = "none";
    showSteps.innerHTML = " ";
    showCalories.innerHTML = " ";
    alert("Se contaron:  " + steps + " pasos " +
        "Se quemaron: " + calories + "Calorías");

    has_moved_on_x = false;
    has_moved_on_y = false;

    previousPosition_x = 0;
    previousPosition_y = 0;

    currentPosition_x = 0;
    currentPosition_y = 0;

    steps = 0;
    calories = 0;
}


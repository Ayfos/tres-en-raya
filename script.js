//------------------------------------------------------
//                OBJETO GAMEBOARD (IIFE)
//------------------------------------------------------

const Gameboard = (function () {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    return {
        obtenerEstado(fila, columna) {
            if (fila < 0 || fila > 2 || columna < 0 || columna > 2) {
                throw new Error("Indices de fila o columna fuera de rango");
            }
            return board[fila][columna];
        },
        estaVacia(fila, columna) {
            return this.obtenerEstado(fila, columna) === "";
        },
        colocarMarca(fila, columna, marca) {
            if (marca !== "X" && marca !== "O") {
                throw new Error("Marca inválida. Debe ser 'X' o 'O'.");
            }
            if (!this.estaVacia(fila, columna)) {
                throw new Error("La celda ya está ocupada.");
            }
            board[fila][columna] = marca;
        },
        reiniciarTablero() {
            for (let fila = 0; fila < 3; fila++) {
                for (let columna = 0; columna < 3; columna++) {
                    board[fila][columna] = "";
                }
            }
        }
    };
})();

//------------------------------------------------------
//               SISTEMA DE PUNTUACIÓN
//------------------------------------------------------

const Scoreboard = (function() {
    let puntuaciones = { X: 0, O: 0, empates: 0 };
    
    return {
        actualizar(ganador) {
            if (ganador === 'empate') {
                puntuaciones.empates++;
            } else {
                puntuaciones[ganador]++;
            }
            this.mostrar();
        },
        
        mostrar() {
            document.getElementById('puntos-x').textContent = puntuaciones.X;
            document.getElementById('puntos-o').textContent = puntuaciones.O;
            document.getElementById('puntos-empates').textContent = puntuaciones.empates;
        },
        
        reiniciar() {
            puntuaciones = { X: 0, O: 0, empates: 0 };
            this.mostrar();
        }
    };
})();

//------------------------------------------------------
//     IMPLEMENTACIÓN DEL GAMECONTROLLER (IIFE)
//------------------------------------------------------

const GameController = (function() {
    let jugadorActual = null;
    let juegoTerminado = false;
    
    const jugadores = [
        { nombre: "Jugador X", simbolo: "X" },
        { nombre: "Jugador O", simbolo: "O" }
    ];

    return {
        iniciarJuego() {
            juegoTerminado = false;
            jugadorActual = jugadores[0]; 
            Gameboard.reiniciarTablero();
            return { 
                tipo: 'inicio', 
                mensaje: '🎮 Juego iniciado - Turno de: ' + jugadorActual.nombre,
                jugador: jugadorActual 
            };
        },

        hacerMovimiento(fila, columna) {
            if (juegoTerminado) {
                return { tipo: 'error', mensaje: 'El juego ha terminado. Reinicie para jugar de nuevo.' };
            }
            
            if (!Gameboard.estaVacia(fila, columna)) {
                return { tipo: 'error', mensaje: 'Celda ocupada. Elige otra.' };
            }
            
            Gameboard.colocarMarca(fila, columna, jugadorActual.simbolo);

            const ganador = this.verificarGanador();
            if (ganador) {
                juegoTerminado = true;
                const jugadorGanador = jugadores.find(jugador => jugador.simbolo === ganador);
                Scoreboard.actualizar(ganador);
                return { 
                    tipo: 'ganador', 
                    mensaje: '🏆 ¡' + jugadorGanador.nombre + ' gana!' 
                };
            }
            
            if (this.verificarEmpate()) {
                juegoTerminado = true;
                Scoreboard.actualizar('empate');
                return { tipo: 'empate', mensaje: '🤝 ¡Empate! No hay más movimientos posibles.' };
            }
            
            this.cambiarTurno();
            return { 
                tipo: 'turno', 
                mensaje: '🔄 Turno de: ' + jugadorActual.nombre,
                jugador: jugadorActual 
            };
        },

        cambiarTurno() {
            jugadorActual = jugadorActual === jugadores[0] ? jugadores[1] : jugadores[0];
        },

        verificarGanador() {
            const lineasGanadoras = [
                [[0,0], [0,1], [0,2]],
                [[1,0], [1,1], [1,2]], 
                [[2,0], [2,1], [2,2]],
                [[0,0], [1,0], [2,0]],
                [[0,1], [1,1], [2,1]],
                [[0,2], [1,2], [2,2]],
                [[0,0], [1,1], [2,2]],
                [[0,2], [1,1], [2,0]]
            ];
        
            for (let linea of lineasGanadoras) {
                const [a, b, c] = linea;
                const valorA = Gameboard.obtenerEstado(a[0], a[1]);
                const valorB = Gameboard.obtenerEstado(b[0], b[1]);
                const valorC = Gameboard.obtenerEstado(c[0], c[1]);
                
                if (valorA !== "" && valorA === valorB && valorA === valorC) {
                    return valorA;
                }
            }
            return null;
        },

        verificarEmpate() {
            for (let fila = 0; fila < 3; fila++) {
                for (let columna = 0; columna < 3; columna++) {
                    if (Gameboard.estaVacia(fila, columna)) {
                        return false;
                    }
                }
            }
            return true;
        },

        obtenerJugadorActual() {
            return jugadorActual;
        },

        estaTerminado() {
            return juegoTerminado;
        }
    };
})();

//------------------------------------------------------
//               DISPLAY CONTROLLER- RENDER
//------------------------------------------------------
const DisplayController = (function(){
    return {
        rendertablero() {
            const tableroDiv = document.querySelectorAll('.celda');
            tableroDiv.forEach(celda => {
                const fila = celda.getAttribute('data-fila');
                const columna = celda.getAttribute('data-columna');
                const valor = Gameboard.obtenerEstado(parseInt(fila), parseInt(columna));
                
                celda.textContent = valor;
                
                // Añadir clase para estilos diferentes según la marca
                celda.className = 'celda';
                if (valor === 'X') {
                    celda.classList.add('marca-x');
                } else if (valor === 'O') {
                    celda.classList.add('marca-o');
                }
            });
        },
        
        actualizarMensaje(mensaje, tipo = '') {
            const mensajeElement = document.getElementById('mensaje-juego');
            if (mensajeElement) {
                mensajeElement.textContent = mensaje;
                mensajeElement.className = `mensaje-juego ${tipo}`;
            }
        },
        
        actualizarTurno(jugador = null) {
            const turnoElement = document.getElementById('turno-actual');
            if (turnoElement) {
                if (!jugador) {
                    jugador = GameController.obtenerJugadorActual();
                }
                const emoji = jugador.simbolo === 'X' ? '❌' : '⭕';
                turnoElement.textContent = `Turno: ${emoji} ${jugador.nombre}`;
            }
        },

        inicializarEventos() {
            // Botón Reiniciar Juego
            document.getElementById('reiniciar').addEventListener('click', () => {
                const resultado = GameController.iniciarJuego();
                this.rendertablero();
                this.actualizarMensaje(resultado.mensaje);
                this.actualizarTurno(resultado.jugador);
            });
            
            // Botón Reiniciar Marcador
            document.getElementById('reiniciar-marcador').addEventListener('click', () => {
                Scoreboard.reiniciar();
                this.actualizarMensaje('📊 Marcador reiniciado', '');
            });
            
            // Celdas del tablero
            document.querySelectorAll('.celda').forEach(celda => {
                celda.addEventListener('click', (event) => {
                    const fila = event.target.getAttribute('data-fila');
                    const columna = event.target.getAttribute('data-columna');
                    
                    const resultado = GameController.hacerMovimiento(parseInt(fila), parseInt(columna));
                    this.rendertablero();
                    this.actualizarMensaje(resultado.mensaje, resultado.tipo);
                    
                    if (resultado.jugador) {
                        this.actualizarTurno(resultado.jugador);
                    }
                });
            });
            
            // Inicializar juego al empezar
            const resultadoInicial = GameController.iniciarJuego();
            this.rendertablero();
            this.actualizarMensaje(resultadoInicial.mensaje);
            this.actualizarTurno(resultadoInicial.jugador);
            Scoreboard.mostrar();
        }
    };
})();

// Inicialización automática
document.addEventListener('DOMContentLoaded', () => {
    DisplayController.inicializarEventos();
});
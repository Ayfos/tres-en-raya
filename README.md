# 🎯 Tres en Raya Moderno

Un juego de Tres en Raya implementado con una arquitectura limpia y patrones de diseño sólidos, desarrollado siguiendo metodologías de programación profesional.

## 🏗️ Arquitectura del Proyecto

El proyecto sigue el patrón **MVC (Model-View-Controller)** con **IIFE (Immediately Invoked Function Expressions)** para un encapsulamiento robusto:

### 🎮 **Gameboard (Model)**
```javascript
const Gameboard = (function() {
    // Lógica del estado del tablero
    return {
        obtenerEstado(),
        estaVacia(),
        colocarMarca(),
        reiniciarTablero()
    };
})();
```

### ⚙️ **GameController (Controller)**
```javascript
const GameController = (function() {
    // Lógica del juego y reglas
    return {
        iniciarJuego(),
        hacerMovimiento(),
        verificarGanador(),
        verificarEmpate()
    };
})();
```

### 🎨 **DisplayController (View)**
```javascript
const DisplayController = (function() {
    // Manipulación del DOM y renderizado
    return {
        rendertablero(),
        actualizarMensaje(),
        inicializarEventos()
    };
})();
```

## 📋 Metodología de Desarrollo

El proyecto fue desarrollado siguiendo un enfoque por capas:

### **Fase 1: Lógica de Consola ✅**
- Implementación completa del juego sin interfaz visual
- Detección de victorias (8 combinaciones ganadoras)
- Gestión de empates y turnos
- Validación de movimientos

### **Fase 2: Separación de Responsabilidades ✅**
- **Gameboard**: Estado puro del tablero
- **GameController**: Reglas del juego y flujo
- **DisplayController**: Interfaz de usuario

### **Fase 3: Integración con DOM ✅**
- Renderizado del array del tablero en la página
- Event listeners para interacción del usuario
- Prevención de movimientos inválidos
- Actualización en tiempo real

## ✨ Características Implementadas

### 🎯 **Lógica del Juego**
- [x] Detección de 3 en raya (horizontal, vertical, diagonal)
- [x] Gestión de turnos entre jugadores
- [x] Validación de celdas ocupadas
- [x] Detección de empates
- [x] Reinicio de partidas

### 🎨 **Interfaz de Usuario**
- [x] Renderizado dinámico del tablero
- [x] Feedback visual inmediato
- [x] Marcador de puntuación persistente
- [x] Diseño responsive y moderno
- [x] Animaciones y transiciones

### 🏗️ **Arquitectura**
- [x] Separación clara MVC
- [x] Encapsulamiento con IIFE
- [x] Código modular y mantenible
- [x] Manejo de errores robusto

## 🚀 Demo en Vivo

[Jugar ahora](https://Ayfos.github.io/tres-en-raya)

## 🎮 Cómo Jugar

1. **Inicio**: El juego comienza automáticamente con el jugador X
2. **Turnos**: Los jugadores alternan colocando X y O
3. **Victoria**: Alinear 3 marcas consecutivas
4. **Empate**: Cuando no quedan movimientos posibles
5. **Controles**: 
   - Click en celdas para jugar
   - "Reiniciar Juego" para nueva partida
   - "Reiniciar Marcador" para resetear puntuaciones

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Grid, Flexbox, Gradients, Animaciones
- **JavaScript ES6+** - IIFE, MVC, Event Delegation

## 📦 Estructura de Archivos

```
tres-en-raya/
├── index.html          # Estructura principal
├── style.css           # Estilos y diseño responsive
├── script.js           # Lógica MVC del juego
└── README.md           # Documentación
```

## 🔧 Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/Ayfos/tres-en-raya.git

# Abrir en navegador
cd tres-en-raya
open index.html
```

## 🎯 Patrones Destacados

### **Encapsulamiento con IIFE**
```javascript
const Module = (function() {
    let privateVariable = "hidden";
    
    return {
        publicMethod() { return privateVariable; }
    };
})();
```

### **Separación MVC**
- **Model**: Gameboard - Estado puro
- **View**: DisplayController - Interfaz visual  
- **Controller**: GameController - Lógica de negocio

### **Manejo de Eventos**
```javascript
// Delegación eficiente de eventos
document.querySelectorAll('.celda').forEach(celda => {
    celda.addEventListener('click', handleCellClick);
});
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue la arquitectura MVC existente.

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles.

---

**Desarrollado con metodologías profesionales y arquitectura limpia** 🏗️
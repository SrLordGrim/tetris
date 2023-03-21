import pygame
import random

# Inicializar Pygame
pygame.init()

# Definir el tamaño de la pantalla
screen_width = 800
screen_height = 600
screen = pygame.display.set_mode((screen_width, screen_height))

# Definir los colores
black = (0, 0, 0)
white = (255, 255, 255)
blue = (0, 0, 255)
green = (0, 255, 0)
red = (255, 0, 0)

# Definir las variables del juego
block_size = 20
falling_block = [[1, 1, 1], [0, 1, 0]]  # Bloque en forma de T
block_x = screen_width // 2 - block_size
block_y = 0
block_color = blue
score = 0

# Crear el tablero
board = [[black for _ in range(screen_width // block_size)] for _ in range(screen_height // block_size)]

# Definir las funciones del juego
def draw_block(x, y, block):
    """Dibuja un bloque en la pantalla."""
    for i in range(len(block)):
        for j in range(len(block[i])):
            if block[i][j] == 1:
                pygame.draw.rect(screen, block_color, (x + j*block_size, y + i*block_size, block_size, block_size))

def new_falling_block():
    """Genera un nuevo bloque que cae."""
    global falling_block, block_x, block_y, block_color
    block_types = [[[1, 1, 1], [0, 1, 0]],  # T
                   [[1, 1], [1, 1]],      # Cuadrado
                   [[1, 0], [1, 1], [0, 1]],  # S
                   [[0, 1], [1, 1], [1, 0]],  # Z
                   [[1, 1, 1, 1]],            # L
                   [[1, 1, 1], [1, 0, 0]],    # J
                   [[0, 1, 0], [1, 1, 1]]]    # I
    falling_block = random.choice(block_types)
    block_x = screen_width // 2 - len(falling_block[0]) * block_size
    block_y = 0
    block_color = random.choice([blue, green, red])

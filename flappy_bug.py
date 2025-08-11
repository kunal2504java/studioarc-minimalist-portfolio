import pygame
import random
import sys

# Initialize pygame
pygame.init()

# Screen dimensions
SCREEN_WIDTH = 400
SCREEN_HEIGHT = 600

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GREEN = (0, 200, 0)
BLUE = (0, 180, 255)

# Game window
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Flappy Bug 🐞")

# Clock for FPS
clock = pygame.time.Clock()

# Fonts
font = pygame.font.SysFont("Arial", 32)

# Load "bug" bird sprite
BUG_SIZE = 34
bug_surface = pygame.Surface((BUG_SIZE, BUG_SIZE), pygame.SRCALPHA)
pygame.draw.circle(bug_surface, (255, 215, 0), (BUG_SIZE//2, BUG_SIZE//2), BUG_SIZE//2)  # body
pygame.draw.circle(bug_surface, (0, 0, 0), (BUG_SIZE//2, BUG_SIZE//2), BUG_SIZE//2, 2)  # outline
pygame.draw.circle(bug_surface, WHITE, (BUG_SIZE//3, BUG_SIZE//3), 5)  # left eye
pygame.draw.circle(bug_surface, WHITE, (2*BUG_SIZE//3, BUG_SIZE//3), 5)  # right eye
pygame.draw.circle(bug_surface, BLACK, (BUG_SIZE//3, BUG_SIZE//3), 2)  # left pupil
pygame.draw.circle(bug_surface, BLACK, (2*BUG_SIZE//3, BUG_SIZE//3), 2)  # right pupil
pygame.draw.line(bug_surface, BLACK, (10, 0), (5, -10), 2)  # antenna left
pygame.draw.line(bug_surface, BLACK, (BUG_SIZE-10, 0), (BUG_SIZE-5, -10), 2)  # antenna right

# Bird variables
bug_x = 50
bug_y = SCREEN_HEIGHT // 2
bug_velocity = 0
gravity = 0.5
jump_strength = -8

# Pipe variables
pipe_width = 60
pipe_gap = 150
pipe_velocity = -3
pipes = []

# Score
score = 0

# Function to create pipes
def create_pipe():
    y = random.randint(150, SCREEN_HEIGHT - 150)
    top_rect = pygame.Rect(SCREEN_WIDTH, y - pipe_gap - 300, pipe_width, 300)
    bottom_rect = pygame.Rect(SCREEN_WIDTH, y, pipe_width, 300)
    return top_rect, bottom_rect

# Reset game
def reset_game():
    global bug_y, bug_velocity, pipes, score
    bug_y = SCREEN_HEIGHT // 2
    bug_velocity = 0
    pipes = []
    score = 0
    pipes.append(create_pipe())

# Main game loop
reset_game()
running = True
while running:
    screen.fill(BLUE)

    # Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                bug_velocity = jump_strength

    # Bird movement
    bug_velocity += gravity
    bug_y += bug_velocity

    # Pipe movement
    new_pipes = []
    for top_rect, bottom_rect in pipes:
        top_rect.x += pipe_velocity
        bottom_rect.x += pipe_velocity
        if top_rect.x + pipe_width > 0:
            new_pipes.append((top_rect, bottom_rect))
        else:
            score += 1
    pipes = new_pipes

    # Add new pipe
    if not pipes or pipes[-1][0].x < SCREEN_WIDTH - 200:
        pipes.append(create_pipe())

    # Draw pipes
    for top_rect, bottom_rect in pipes:
        pygame.draw.rect(screen, GREEN, top_rect)
        pygame.draw.rect(screen, GREEN, bottom_rect)

        # Collision detection
        bug_rect = pygame.Rect(bug_x, bug_y, BUG_SIZE, BUG_SIZE)
        if bug_rect.colliderect(top_rect) or bug_rect.colliderect(bottom_rect):
            reset_game()

    # Check ground/ceiling collision
    if bug_y <= 0 or bug_y >= SCREEN_HEIGHT - BUG_SIZE:
        reset_game()

    # Draw bug
    screen.blit(bug_surface, (bug_x, bug_y))

    # Draw score
    score_text = font.render(str(score), True, WHITE)
    screen.blit(score_text, (SCREEN_WIDTH // 2 - score_text.get_width() // 2, 20))

    # Update screen
    pygame.display.flip()
    clock.tick(60)

# demo_animation.py
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

# Create figure
fig, ax = plt.subplots()
x, y = [], []
line, = ax.plot([], [], lw=2)
ax.set_xlim(0, 10)
ax.set_ylim(-1.5, 1.5)
ax.set_title("AI Demo Animation")

# Initialization
def init():
    line.set_data([], [])
    return line,

# Update function for animation
def update(frame):
    x.append(frame * 0.1)
    y.append(np.sin(frame * 0.1))
    line.set_data(x, y)
    return line,

# Create animation
ani = animation.FuncAnimation(fig, update, frames=100, init_func=init, blit=True)

# Save as GIF
try:
    ani.save("demo_animation.gif", writer='pillow', fps=20)
    print("Animation saved as demo_animation.gif")
except Exception as e:
    print(f"Error saving animation: {e}")

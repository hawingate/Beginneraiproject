# computer_class_animation.py
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import matplotlib.animation as animation

# Create figure
fig, ax = plt.subplots(figsize=(6,4))
ax.set_xlim(0, 10)
ax.set_ylim(0, 6)
ax.axis('off')

# Draw classroom layout
teacher_pos = (5, 5)
student_positions = [(2,2), (5,2), (8,2)]

# Draw teacher computer
teacher = patches.Rectangle((teacher_pos[0]-0.5, teacher_pos[1]-0.5), 1, 1, facecolor='skyblue')
ax.add_patch(teacher)
teacher_screen = ax.text(teacher_pos[0], teacher_pos[1], "PC", ha='center', va='center', fontsize=12, weight='bold')

# Draw students
students = []
student_screens = []
for pos in student_positions:
    s = patches.Rectangle((pos[0]-0.4, pos[1]-0.4), 0.8, 0.8, facecolor='lightgreen')
    ax.add_patch(s)
    students.append(s)
    t = ax.text(pos[0], pos[1], "PC", ha='center', va='center', fontsize=10, weight='bold')
    student_screens.append(t)

# Draw blackboard
blackboard = patches.Rectangle((1, 4.2), 8, 0.6, facecolor='black')
ax.add_patch(blackboard)
board_text = ax.text(5, 4.5, "Lesson: Python 🖥️", color='white', ha='center', va='center', fontsize=12)

# Animation function: make teacher wave its “hand” (small line)
hand, = ax.plot([], [], color='red', lw=2)

def init():
    hand.set_data([], [])
    return hand,

def animate(frame):
    # Make hand move up and down like waving
    x = [teacher_pos[0]+0.5, teacher_pos[0]+0.5]
    y = [teacher_pos[1]+0.2, teacher_pos[1]+0.5 + 0.2 * ((frame%20)/10)]
    hand.set_data(x, y)
    return hand,

ani = animation.FuncAnimation(fig, animate, frames=60, interval=200, blit=True, init_func=init)

# Save as GIF for GitHub
try:
    ani.save("computer_class.gif", writer='pillow', fps=5)
    print("GIF saved as computer_class.gif")
except Exception as e:
    print(f"Error saving animation: {e}")

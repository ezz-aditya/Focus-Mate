from sklearn.tree import DecisionTreeClassifier
import numpy as np


# [confidence, score]
X = np.array([
    [1, 20],
    [2, 35],
    [3, 50],
    [4, 70],
    [5, 85],
    [2, 60],
    [4, 40],
    [5, 90]
])

# Labels: 
y = np.array([0, 0, 1, 2, 2, 1, 1, 2])

model = DecisionTreeClassifier()
model.fit(X, y)

def predict_difficulty(confidence, score):
    prediction = model.predict([[confidence, score]])[0]

    if prediction == 0:
        return "Hard"
    elif prediction == 1:
        return "Medium"
    else:
        return "Easy"

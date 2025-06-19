from django.urls import path
from .views import signup
from .views import login
from .views import displayUser
from .views import correct_grammar
from .views import updateUser

# from .views import paraphrase_text
from .views import summarize_text

urlpatterns = [
    path("signup", signup),
    path("login", login),
    path("displayuser/<int:id>", displayUser),
    path("correct_grammar", correct_grammar),
    path("update-user/<int:id>", updateUser),
    # path("paraphrase", paraphrase_text),
    path("summarize", summarize_text),
]

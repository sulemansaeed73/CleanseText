from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer
from django.views import View
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
grammar_corrector = pipeline(
    "text2text-generation", model="prithivida/grammar_error_correcter_v1"
)

# model_name = "ramsrigouthamg/t5_paraphraser"
# tokenizer = AutoTokenizer.from_pretrained(model_name)
# model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
# paraphraser = pipeline("text2text-generation", model="Vamsi/T5_Paraphrase_Paws")

# paraphraser = pipeline("text2text-generation", model="ramsrigouthamg/t5_paraphraser")


@api_view(["POST"])
def signup(request):
    email = request.data.get("email")
    if User.objects.filter(email=email).exists():
        return Response(
            {"message": "Email is already taken"}, status=status.HTTP_400_BAD_REQUEST
        )

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"message": "Incomplete detail"}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"message": "Email Does Not Exist"}, status=status.HTTP_400_BAD_REQUEST
        )

    if user.check_password(password):
        refresh = RefreshToken.for_user(user)
        serialized_user = UserSerializer(user)
        return Response(
            {
                "message": "Logged in successfully",
                **serialized_user.data,
                "token": str(refresh.access_token),
            },
            status=status.HTTP_200_OK,
        )

    return Response(
        {"message": "Incorrect Password"}, status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["GET"])
def displayUser(request, id):
    try:
        user = User.objects.get(pk=id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["PATCH"])
def updateUser(request, id):
    try:
        user = User.objects.get(pk=id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)


# Load the model and pipeline only once when server starts


@api_view(["POST"])
def correct_grammar(request):
    data = request.data
    text = data.get("text", "")
    if not text:
        return Response({"error": "No text provided"}, status=400)

    # Get corrected text
    result = grammar_corrector(text, max_length=512)
    corrected_text = result[0]["generated_text"]

    return Response({"corrected_text": corrected_text})


# @api_view(["POST"])
# def paraphrase_text(request):
#     try:
#         input_text = request.data.get("text", "")
#         if not input_text:
#             return Response({"error": "Text is required"}, status=400)

#         # Format input for T5-style model
#         input_ids = tokenizer.encode(
#             f"paraphrase: {input_text} </s>",
#             return_tensors="pt",
#             max_length=256,
#             truncation=True,
#         )

#         # Generate paraphrased output
#         output = model.generate(
#             input_ids, max_length=256, num_beams=4, early_stopping=True
#         )

#         paraphrased = tokenizer.decode(output[0], skip_special_tokens=True)
#         return Response({"paraphrased": paraphrased})

#     except Exception as e:
#         return Response({"error": str(e)}, status=500)


# @api_view(["POST"])
# def paraphrase_text(request):
#     text = request.data.get("text", "")
#     if not text:
#         return Response({"error": "Text is required"}, status=400)

#     prompt = f"paraphrase: {text} </s>"
#     result = paraphraser(
#         prompt,
#         max_length=100,
#         do_sample=True,
#         top_k=120,
#         top_p=0.95,
#         early_stopping=True,
#     )
#     corrected_text = result[0]["generated_text"]
#     return Response({"paraphrased_text": corrected_text})


@api_view(["POST"])
def summarize_text(request):
    text = request.data.get("text", "")
    if not text:
        return Response({"error": "Text is required"}, status=400)

    summary = summarizer(text, max_length=130, min_length=30, do_sample=False)
    corrected_text = summary[0]["summary_text"]
    return Response({"corrected_text": corrected_text})

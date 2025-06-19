from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ItemSerializer
from .models import Item
import fitz
import os
from docx import Document


@api_view(["POST"])
def fileUpload(request):
    try:
        data = request.data.copy()
        # data["user_id"] = id

        serializer = ItemSerializer(data=data)
        if serializer.is_valid():
            instance = serializer.save()

            uploaded_file = request.FILES["file"]
            file_name = uploaded_file.name.lower()

            extracted_text = ""

            if file_name.endswith(".pdf"):
                # Read PDF text using PyMuPDF
                doc = fitz.open(stream=uploaded_file.read(), filetype="pdf")
                for page in doc:
                    extracted_text += page.get_text()
            elif file_name.endswith(".docx"):
                # Read DOCX text using python-docx
                doc = Document(uploaded_file)
                for para in doc.paragraphs:
                    extracted_text += para.text + "\n"
            else:
                return Response(
                    {"message": "Unsupported file format"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            return Response(
                {
                    "message": "File Uploaded Successfully",
                    "extracted_text": extracted_text,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"message": "Validation failed", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Exception as e:
        return Response(
            {"message": "Server Error", "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

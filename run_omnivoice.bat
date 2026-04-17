@echo off
echo ==========================================
echo Starting OmniVoice Local API...
echo ==========================================

cd omnivoice_api

echo [1/2] Checking and installing dependencies...
python -m pip install -r requirements.txt

echo [2/2] Starting FastAPI server on port 8000...
python -m uvicorn main:app --reload --port 8000

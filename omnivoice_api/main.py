from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import torchaudio
from omnivoice import OmniVoice
import io
import os
import contextlib

@contextlib.asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model on startup
    global model
    device = "cuda" if torch.cuda.is_available() else "cpu"
    dtype = torch.float16 if device == "cuda" else torch.float32
    print(f"Loading OmniVoice model on {device} ({dtype})... This may take a while the first time.")
    model = OmniVoice.from_pretrained(
        "k2-fsa/OmniVoice",
        device_map=device,
        dtype=dtype
    )
    print("OmniVoice model loaded successfully!")
    yield
    # Cleanup on shutdown (if needed)

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    text: str
    instruct: str | None = None

@app.post("/generate")
async def generate_speech(req: GenerateRequest):
    print(f"Generating for text: {req.text}, instruct: {req.instruct}")
    audio = model.generate(
        ref_audio="./sample.wav",
        text=req.text,
        instruct="",
    )
    
    # audio is a list of torch.Tensor with shape (1, T) at 24 kHz.
    buffer = io.BytesIO()
    torchaudio.save(buffer, audio[0], 24000, format="wav")
    buffer.seek(0)
    
    return StreamingResponse(buffer, media_type="audio/wav")

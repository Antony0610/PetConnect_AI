from backend.main import app

# Export FastAPI app for Vercel Serverless Function entry point
handler = app

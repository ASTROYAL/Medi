from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Pathology Lab & Pharmacy API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Pathology Lab & Pharmacy API"}

@app.get("/api/tests")
def get_tests():
    return [
        {"id": "t1", "name": "Complete Blood Count (CBC)", "price": 400},
        {"id": "t2", "name": "Lipid Profile", "price": 800},
        {"id": "t3", "name": "Thyroid Profile (T3, T4, TSH)", "price": 600},
        {"id": "t4", "name": "HbA1c", "price": 500},
    ]

@app.get("/api/medicines")
def get_medicines():
    return [
        {"id": "m1", "name": "Paracetamol 500mg", "price": 20, "prescription_required": False},
        {"id": "m2", "name": "Amoxicillin 250mg", "price": 120, "prescription_required": True},
        {"id": "m3", "name": "Cetirizine 10mg", "price": 30, "prescription_required": False},
    ]